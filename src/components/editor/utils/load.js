/* eslint-disable no-debugger */
import * as nodesModel from '../models'
//1
export function createNodesModel(config = {}) {
  const { Events = [], Gateways = [], Tasks = [] } = config
  const eventNodes = Events.reduce((container, item) => {
    const type = item.Type
    const name = item.Id
    if (type === 'StartEvent') {
      return [...container, new nodesModel.StartNode({ name })]
    } else if (type === 'EndEvent') {
      return [...container, new nodesModel.EndNode({ name })]
    }
    return container
  }, [])
  const gatewayNodes = Gateways.reduce((container, item) => {
    const type = item.Type
    const name = item.Id
    if (type === 'SplitGateway') {
      return [
        ...container,
        new nodesModel.ConditionNode(
          { name },
          { conditions: [{ code: 'yes' }, { code: 'no' }] }
        )
      ]
    } else if (type === 'JoinGateway') {
      return [...container, new nodesModel.JoinNode({ name })]
    }
    return container
  }, [])
  const taskNodes = Tasks.reduce((container, item) => {
    const type = item.Type
    const name = item.Id
    if (type === 'UserTask') {
      return [...container, new nodesModel.TaskNode({ name })]
    }
    return container
  }, [])
  return [...eventNodes, ...gatewayNodes, ...taskNodes]
}
//2
export function createNodes(models) {
  return models.map(model => model.render())
}
//3
export function initEndpoints(jsPlumb, models) {
  models.forEach(model => {
    model.setPoint(jsPlumb)
  })
}
//TODO 4 建立连接
export function connectNodes(jsPlumb, config) {
  console.log({ jsPlumb, config })
}
//TODO 5 注册事件
export function registerEvents(models) {
  console.log(models)
}
//TODO 6 注册其他
export function registerOther(jsPlumb) {
  //设置容器
  jsPlumb.setContainer('diagramContainer')
  //注册节点可拖拽
  jsPlumb.draggable(document.querySelectorAll('[draggable]'), {
    containment: 'diagramContainer',
    grid: [20, 20]
  })
}
