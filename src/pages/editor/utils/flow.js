/* eslint-disable */
import { jsPlumb } from 'jsplumb'
import * as jsPlumbUtils from './load'
import { request } from './request'
import { saveJSON, readJson } from './file'
import * as nodesModel from '../models'
import { guid } from '../utils/common'
import { error } from '../utils/tips'
import {
  NODE_TYPES_MAP,
  GRID,
  CONTAINER_ID,
  activeConnectorPaintStyle,
  connectorPaintStyle
} from '../config'
export class Flow {
  models = []
  edges = new Set()
  config = { Title: '未命名', Version: 0, Id: guid() }
  jsPlumb
  events = {}
  container
  selected = [] //当前被选择的node
  selectedEdges = [] //当前被选择的边
  name = '未命名'
  multiple = false //是否多选
  constructor() {
    this.jsPlumb = jsPlumb.getInstance()
  }
  //加载配置
  async init(path) {
    this.container = document.querySelector(`#${CONTAINER_ID}`)
    if (path) {
      const { data } = await request(path)
      this.config = data
    }
    this.models = jsPlumbUtils.createNodesModel(this, this.config)
    await this.mount()
  }
  //挂载dom
  mount() {
    return new Promise(r => {
      //将节点dom挂载到页面
      this.models.forEach(model => {
        this.container.append(model.render())
      })
      //注册基本功能
      this.jsPlumb.ready(() => {
        jsPlumbUtils.registerEvents(this)
        jsPlumbUtils.registerOther(this)
        jsPlumbUtils.initEndpoints(this, this.models)
        jsPlumbUtils.connectNodes(this, this.config)
        r()
      })
    })
  }
  // 本地导入json
  async loadFromJson() {
    const jsonData = await readJson()
    if (jsonData) {
      this.reset()
      this.config = jsonData
      this.models = jsPlumbUtils.createNodesModel(this, this.config)
      await this.mount()
    }
  }
  //导出Json
  exportJson() {
    const { Id, Version, Title } = this.config
    const otherInfo = this.models.reduce(
      (prev, current) => {
        const cat = current.cat
        if (!prev[cat]) {
          prev[cat] = []
        }
        prev[cat].push(current.data.meta)
        prev.Position[current.id] = current.position
        return prev
      },
      { Position: {} }
    )
    const Transitions = [...this.edges].map(conn => conn.getData())
    const data = { Id, Version, Title, ...otherInfo, Transitions }
    // saveJSON(data, `${data.Title}.json`)
    return data
  }
  //创建节点
  createNode(type, { offsetX, offsetY }) {
    switch (type) {
      case 'StartEvent':
        return this.addNode(
          createBaseNode(this, type, [offsetX, offsetY], nodesModel.StartModel)
        )
      case 'EndEvent':
        return this.addNode(
          createBaseNode(this, type, [offsetX, offsetY], nodesModel.EndModel)
        )
      case 'SplitGateway':
        return this.addNode(
          createBaseNode(
            this,
            type,
            [offsetX, offsetY],
            nodesModel.GatewayModel
          )
        )
      case 'JoinGateway':
        return this.addNode(
          createBaseNode(this, type, [offsetX, offsetY], nodesModel.JoinModel)
        )
      case 'UserTask':
        return this.addNode(
          createBaseNode(this, type, [offsetX, offsetY], nodesModel.TaskModel)
        )
      default:
        return null
    }
  }
  //添加新节点
  addNode(model) {
    this.models.push(model)
    this.container.append(model.render())
    this.setEndPoint(model)
    return model
  }
  //添加锚点
  setEndPoint(model) {
    model.setPoint()
    this.jsPlumb.draggable(model.id, {
      containment: CONTAINER_ID,
      grid: GRID
    })
  }
  //注册事件
  registerListenner(obj = {}) {
    this.events = obj
  }
  //取消全部选择
  unSelectAll() {
    this.selected.forEach(model => {
      model.nodeInstance.active(false)
    })
    this.resetEdgesStyle()
    this.selectedEdges = []
    this.selected = []
  }
  //重置flow数据，和图形
  reset() {
    this.models = []
    this.edges = new Set()
    this.config = { Title: '未命名', Version: 0, Id: guid() }
    this.selected = []
    this.jsPlumb.empty(CONTAINER_ID)
  }
  //解析连接配置 连接节点
  connectEdgeByConfig(config) {
    const { From, To, Name } = config
    const fromUuid = Name ? `${From}.${Name}` : `${From}.from`
    const connection = this.jsPlumb.connect({
      uuids: [fromUuid, `${To}.to`]
    })
    connection.setData(config)
    this.edges.add(connection)
  }
  //
  afterNodeSelectedChange(active) {
    if (active) {
      this.resetEdgesStyle()
      this.selectedEdges = []
    }
  }
  //增加边后的操作
  addEdge(info) {
    const { sourceEndpoint, targetEndpoint, connection } = info
    const sourceUuid = sourceEndpoint.getUuid()
    const targetUuid = targetEndpoint.getUuid()
    const isExist = this.existSameEdge(sourceUuid, targetUuid)
    if (isExist) {
      this.jsPlumb.deleteConnection(connection)
      error('不能连接相同节点')
      return
    }
    const [sourceId, code] = sourceUuid.split('.')
    const [targetId] = targetUuid.split('.')
    let edge = { From: sourceId, To: targetId }
    if (code.toLowerCase() !== 'from') {
      edge.Name = code
    }
    connection.setData(edge)
    this.edges.add(connection)
  }
  existSameEdge(sourceUuid, targetUuid) {
    return [...this.edges].some(conn => {
      const [sourceEp, targetEp] = conn.endpoints
      return (
        sourceEp.getUuid() === sourceUuid && targetEp.getUuid() === targetUuid
      )
    })
  }
  //移除边之后的操作
  deleteEdge(conn) {
    this.edges.delete(conn)
  }
  //边选择
  selectEdge(conn) {
    if (this.selectedEdges.includes(conn)) {
      return
    }
    if (this.multiple) {
      this.selectedEdges.push(conn)
    } else {
      this.selectedEdges = [conn]
    }
    this.resetEdgesStyle()
    this.selectedEdges.forEach(conn => {
      conn.setPaintStyle(activeConnectorPaintStyle)
    })
  }
  //重置边的样式
  resetEdgesStyle() {
    ;[...this.edges].forEach(conn => {
      conn.setPaintStyle(connectorPaintStyle)
    })
  }
}

function createBaseNode(context, type, position, nodeClass) {
  const meta = { Id: `${type}_${String(Date.now()).substr(5)}`, Type: type }
  const cat = NODE_TYPES_MAP[type].cat
  return new nodeClass({ id: meta.Id, context, type, cat, position }, { meta })
}
