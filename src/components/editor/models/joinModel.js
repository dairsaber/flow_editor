import Node from './baseModel'
import * as configTool from '../config'
import Join from '../nodes/JoinNode'
export class JoinNode extends Node {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          anchor: configTool.defaultAnchor,
          endpoint: configTool.defaultSourceEndpoint
        },
        {
          anchor: { ...configTool.defaultAnchor, anchor: 'Top' },
          endpoint: configTool.defaultTargetPoint
        }
      ],
      type: 'join',
      ...(config || {})
    })
  }
  render() {
    return this.$createElement(Join, { props: { config: this } })
  }
}
