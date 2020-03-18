import Node from './baseModel'
import * as configTool from '../config'
import End from '../nodes/EndNode'
export class EndNode extends Node {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          id:"Top",
          anchor: { ...configTool.defaultAnchor, anchor: 'Top' },
          endpoint: configTool.defaultTargetPoint 
        }
      ],
      type: 'end',
      ...(config || {})
    })
  }
  render() {
    return this.$createElement(End, { props: { config: this } })
  }
}
