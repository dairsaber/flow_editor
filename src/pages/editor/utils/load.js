/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import * as nodesModel from '../models'
import { CONTAINER_ID, GRID } from '../config'
import { confirm } from './tips'
//1
export function createNodesModel(context, config = {}) {
  const { Events = [], Gateways = [], Tasks = [], Position = {} } = config
  // 事件节点模型
  const eventNodes = Events.reduce((container, item) => {
    const type = item.Type
    const id = item.Id
    if (type === 'StartEvent') {
      return [
        ...container,
        new nodesModel.StartModel(
          { id, type, cat: 'Events', context, position: Position[id] },
          { meta: item }
        )
      ]
    } else if (type === 'EndEvent') {
      return [
        ...container,
        new nodesModel.EndModel(
          { id, type, context, cat: 'Events', position: Position[id] },
          { meta: item }
        )
      ]
    }
    return container
  }, [])
  // 关卡节点模型
  const gatewayNodes = Gateways.reduce((container, item) => {
    const type = item.Type
    const id = item.Id
    if (type === 'SplitGateway') {
      return [
        ...container,
        new nodesModel.GatewayModel(
          { id, context, type, cat: 'Gateways', position: Position[id] },
          { meta: item }
        )
      ]
    } else if (type === 'JoinGateway') {
      return [
        ...container,
        new nodesModel.JoinModel(
          { id, context, type, cat: 'Gateways', position: Position[id] },
          { meta: item }
        )
      ]
    }
    return container
  }, [])
  // 任务节点模型
  const taskNodes = Tasks.reduce((container, item) => {
    const type = item.Type
    const id = item.Id
    if (type === 'UserTask') {
      return [
        ...container,
        new nodesModel.TaskModel(
          { id, type, context, cat: 'Tasks', position: Position[id] },
          { meta: item }
        )
      ]
    }
    return container
  }, [])
  return [...eventNodes, ...gatewayNodes, ...taskNodes]
}
//2
export function createNodes(context, models) {
  return models.map(model => model.render())
}
//3
export function initEndpoints(context, models) {
  models.forEach(model => {
    model.setPoint()
  })
}
//TODO 4 建立连接
export function connectNodes(context, config) {
  const { Transitions } = config
  Transitions.forEach(item => {
    const { From, To, Name } = item
    const fromUuid = Name ? `${From}.${Name}` : `${From}.from`
    context.jsPlumb.connect({
      uuids: [fromUuid, `${To}.to`]
    })
    context.edges[`${fromUuid}|${To}.to`] = item
  })
}
//TODO 5 注册事件
export function registerEvents(context) {
  //连接线连接时
  context.jsPlumb.bind('connection', info => {
    addEdge(context, info.sourceEndpoint, info.targetEndpoint)
  })
  //断连接时
  context.jsPlumb.bind('connectionDetached', info => {
    deleteEdge(
      context,
      info.sourceEndpoint.getUuid(),
      info.targetEndpoint.getUuid()
    )
  })
  // 单点击了连接线,
  context.jsPlumb.bind('dblclick', async conn => {
    console.log({ conn })
    if (await confirm('删除提示', '确定删除此链接吗？')) {
      context.jsPlumb.deleteConnection(conn)
    }
  })
  // 改变线的连接节点
  context.jsPlumb.bind('connectionMoved', evt => {
    deleteEdge(
      context,
      evt.originalSourceEndpoint.getUuid(),
      evt.originalTargetEndpoint.getUuid()
    )
  })
  context.jsPlumb.bind('contextmenu', function(component) {
    // console.log({ component })
    window.component = component
  })
}
//TODO 6 注册其他
export function registerOther(context) {
  //设置容器
  context.jsPlumb.setContainer(CONTAINER_ID)
  //注册节点可拖拽
  context.jsPlumb.draggable(document.querySelectorAll('[nodeDraggable]'), {
    containment: CONTAINER_ID,
    grid: GRID
  })
}

function deleteEdge(context, sourceUuid, targetUuid) {
  delete context.edges[`${sourceUuid}|${targetUuid}`]
}

function addEdge(context, sourceEndpoint, targetEndpoint) {
  const sourceUuid = sourceEndpoint.getUuid()
  const targetUuid = targetEndpoint.getUuid()
  const [sourceid, code] = sourceUuid.split('.')
  const [targetId] = targetUuid.split('.')
  let edge = { From: sourceid, To: targetId }
  if (code.toLowerCase() !== 'from') {
    edge.Name = code
  }
  context.edges[`${sourceUuid}|${targetUuid}`] = edge
}
