import BaseModel from './baseModel'
import * as configTool from '../config'
import { EndNode } from '../nodes/EndNode'
import { createDom } from '../utils/common'
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
    this.nodeInstance = new EndNode({ model: this })
    this.currentEle = this.nodeInstance.render(createDom)
    return this.currentEle
  }
}
