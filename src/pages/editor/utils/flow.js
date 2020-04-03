/* eslint-disable no-debugger */
import { jsPlumb } from 'jsplumb'
import * as jsPlumbUtils from './load'
import { request } from './request'
import { saveJSON } from './file'
import * as nodesModel from '../models'
import { guid } from '../utils/common'
import { NODE_TYPES_MAP, GRID, CONTAINER_ID } from '../config'
export class Flow {
  nodes = []
  models = []
  edges = {}
  config
  jsPlumb
  events = {}
  constructor() {
    this.jsPlumb = jsPlumb.getInstance()
  }
  //加载配置
  async loadData(path) {
    const { data } = await request(path)
    this.config = data
    this.models = jsPlumbUtils.createNodesModel(this, this.config)
    this.nodes = jsPlumbUtils.createNodes(this, this.models)
  }
  //挂载dom
  mount() {
    return new Promise(r => {
      this.jsPlumb.ready(() => {
        jsPlumbUtils.registerEvents(this)
        jsPlumbUtils.registerOther(this)
        jsPlumbUtils.initEndpoints(this, this.models)
        jsPlumbUtils.connectNodes(this, this.config)
        r()
      })
    })
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
    const Transitions = Object.values(this.edges)
    const data = { Id, Version, Title, ...otherInfo, Transitions }
    saveJSON(data, `${data.Title}.json`)
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
    const node = model.render()
    this.nodes.push(node)
    return model
  }
  registerNode(model) {
    model.setPoint()
    this.jsPlumb.draggable(model.id, {
      containment: CONTAINER_ID,
      grid: GRID
    })
  }
  registerListenner(obj = {}) {
    this.events = obj
  }
}

function createBaseNode(context, type, position, nodeClass) {
  const meta = { id: `${type}_${guid()}`, type }
  const cat = NODE_TYPES_MAP[type].cat
  return new nodeClass({ ...meta, context, type, cat, position }, { meta })
}
