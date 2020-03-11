import Vue from 'vue'
import * as configTool from '../config'
import Condition from './ConditionNode'
import Start from './StartNode'
const VueInstance = new Vue()

//eslint-disable-next-line
const h = VueInstance.$createElement

export class Node {
  position
  id
  data
  endpoints
  type
  name
  on //存储节点事件处理方法的
  constructor(config = {}) {
    this.position = config.position || [0, 0]
    this.data = config.data
    this.endpoints = config.endpoints
    this.name = config.name
    this.type = config.type
    this.on = config.on || {}
  }

  setPoint(jsPlumb) {
    this.endpoints.forEach(({ anchor, endpoint }) => {
      jsPlumb.addEndpoint(
        this.name,
        { uuid: `${this.name}${anchor.anchor}`, ...anchor },
        endpoint
      )
    })
  }
}
export class StartNode extends Node {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          anchor: { ...configTool.defaultAnchor },
          endpoint: { isSource: true, ...configTool.defaultEndpoint }
        }
      ],
      type: 'start',
      ...(config || {})
    })
  }
  render() {
    return h(Start, { props: { config: this } })
  }
}
//条件节点
export class ConditionNode extends Node {
  constructor(config, data) {
    const conditions = data.conditions || []
    super({
      data,
      endpoints: [
        {
          anchor: { ...configTool.defaultAnchor, anchor: 'Top' },
          endpoint: configTool.getEndPointConfig(configTool.defaultTargetPoint)
        },
        ...conditions.map((item, index) => {
          return {
            anchor: {
              ...configTool.defaultAnchor,
              anchor: [0, 0, 0, 0, 0, 10 + (index + 1) * 20]
            },
            endpoint: configTool.getEndPointConfig({ isSource: true })
          }
        })
      ],
      type: 'Effect',
      ...(config || {})
    })
  }
  render() {
    return h(Condition, { props: { config: this } })
  }
}
