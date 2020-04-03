import BaseModel from './baseModel'
import * as configTool from '../config'
import Start from '../nodes/StartNode'
export class StartModel extends BaseModel {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          anchor: configTool.defaultAnchor,
          endpoint: configTool.defaultSourceEndpoint
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
