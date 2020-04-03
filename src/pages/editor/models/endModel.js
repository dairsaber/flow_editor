import BaseModel from './baseModel'
import * as configTool from '../config'
import End from '../nodes/EndNode'
export class EndModel extends BaseModel {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
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
