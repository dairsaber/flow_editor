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
            code: item.code,
            anchor: {
              ...configTool.defaultAnchor,
              anchor: [1, 0, 1, 0, 0, 20 + (index + 1) * 40]
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
    const currentAnchor = [1, 0, 1, 0, 0, 10 + this.data.conditions.length * 40]
    const uuid = `${this.id}.${condition.code}`
    this.jsPlumb.addEndpoint(
      this.id,
      {
        ...configTool.defaultAnchor,
        uuid,
        anchor: currentAnchor
      },
      configTool.defaultSourceEndpoint
    )
    this.points.push(uuid)
  }
  render() {
    return this.$createElement(Condition, { props: { config: this } })
  }
}
