import Node from './baseModel'
import * as configTool from '../config'
import End from '../nodes/EndNode'
export class EndNode extends Node {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          anchor: { ...configTool.defaultAnchor, anchor: 'Top' },
          endpoint: configTool.defaultTargetPoint 
        }
      ],
      type: 'start',
      ...(config || {})
    })
  }
  render() {
    return this.$createElement(End, { props: { config: this } })
  }
}
