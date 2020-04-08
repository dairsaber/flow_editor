import BaseModel from './baseModel'
import * as configTool from '../config'
import { JoinNode } from '../nodes/JoinNode'
import { createDom } from '../utils/common'
export class JoinModel extends BaseModel {
  constructor(config, data) {
    super({
      name: '聚合',
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
    this.nodeInstance = new JoinNode({ model: this })
    this.currentEle = this.nodeInstance.render(createDom)
    return this.currentEle
  }
}
