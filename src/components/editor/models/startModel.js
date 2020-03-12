import Node from './baseModel'
import * as configTool  from '../config'
import Start from '../nodes/StartNode'
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
    return this.$createElement(Start, { props: { config: this } })
  }
}
