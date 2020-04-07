import BaseModel from './baseModel'
import * as configTool from '../config'
import { StartNode } from '../nodes/StartNode'
import { createDom } from '../utils/common'
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
    this.nodeInstance = new StartNode({ model: this })
    this.currentEle = this.nodeInstance.render(createDom)
    return this.currentEle
  }
}
