/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import * as nodesModel from '../models'
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
        new nodesModel.StartNode(
          { id, type, cat: 'Events', context, position: Position[id] },
          { meta: item }
        )
      ]
    } else if (type === 'EndEvent') {
      return [
        ...container,
        new nodesModel.EndNode(
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
        new nodesModel.ConditionNode(
          { id, context, type, cat: 'Gateways', position: Position[id] },
          { conditions: [{ code: '通过' }, { code: '不通过' }], meta: item }
        )
      ]
    } else if (type === 'JoinGateway') {
      return [
        ...container,
        new nodesModel.JoinNode(
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
        new nodesModel.TaskNode(
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
  context.jsPlumb.bind('connection', (info, origin) => {
    console.log({ info, origin })
  })
  //断连接时
  context.jsPlumb.bind('connectionDetached', (info, origin) => {
    console.log({ info, origin })
  })
  // 单点击了连接线,
  context.jsPlumb.bind('dblclick', async conn => {
    if (await confirm('删除提示', '确定删除此链接吗？')) {
      context.jsPlumb.deleteConnection(conn)
    }
  })
  // 改变线的连接节点
  context.jsPlumb.bind('connectionMoved', evt => {
    console.log(
      evt.originalSourceEndpoint.getUuid(),
      evt.originalTargetEndpoint.getUuid()
    )
  })
  context.jsPlumb.bind('contextmenu', function(component) {
    console.log({ component })
    window.component = component
  })
}
//TODO 6 注册其他
export function registerOther(context) {
  //设置容器
  context.jsPlumb.setContainer('diagramContainer')
  //注册节点可拖拽
  context.jsPlumb.draggable(document.querySelectorAll('[draggable]'), {
    containment: 'diagramContainer',
    grid: [20, 20]
  })
}
