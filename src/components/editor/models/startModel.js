import Node from './baseModel'
import * as configTool from '../config'
import Start from '../nodes/StartNode'
export class StartNode extends Node {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          id: 'Bottom',
          anchor: configTool.defaultAnchor ,
          endpoint:configTool.defaultSourceEndpoint 
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
