import Node from './baseModel'
import * as configTool from '../config'
import Condition from '../nodes/ConditionNode'

//条件节点
export class ConditionNode extends Node {
  constructor(config, data) {
    const conditions = data.conditions || []
    super({
      data,
      endpoints: [
        {
          anchor: {
            ...configTool.defaultAnchor,
            anchor: 'Top',
            maxConnections: 1
          },
          endpoint: {
            ...configTool.defaultTargetPoint,
            dragAllowedWhenFull: false
          }
        },
        ...conditions.map((item, index) => {
          return {
            id: item.code,
            anchor: {
              ...configTool.defaultAnchor,
              anchor: [0, 0, 0, 0, 0, 10 + (index + 1) * 20]
            },
            endpoint: configTool.defaultSourceEndpoint
          }
        })
      ],
      type: 'Effect',
      ...(config || {})
    })
  }
  addCondtion(condition) {
    this.data.conditions.push(condition)
    this.addPoint(condition)
  }
  addPoint(condition) {
    const currentAnchor = [0, 0, 0, 0, 0, 10 + this.data.conditions.length * 20]
    this.jsPlumb.addEndpoint(
      this.name,
      {
        ...configTool.defaultAnchor,
        uuid: `${this.name}.${condition.code}`,
        anchor: currentAnchor
      },
      configTool.defaultSourceEndpoint
    )
  }
  render() {
    return this.$createElement(Condition, { props: { config: this } })
  }
}
