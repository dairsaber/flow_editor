import BaseModel from './baseModel'
import * as configTool from '../config'
import { GatewayNode } from '../nodes/GatewayNode'
import { createDom } from '../utils/common'

//条件节点
export class GatewayModel extends BaseModel {
  constructor(config, data) {
    super({
      name: '关口',
      data,
      endpoints: [
        {
          anchor: {
            ...configTool.defaultAnchor,
            anchor: 'Top',
            maxConnections: 1
          },
          endpoint: {
            ...configTool.defaultTargetPoint,
            dragAllowedWhenFull: false
          }
        },
        {
          anchor: {
            ...configTool.defaultAnchor,
            anchor: 'Bottom'
          },
          endpoint: {
            ...configTool.defaultSourceEndpoint,
            dragAllowedWhenFull: false
          }
        }
      ],
      type: 'Effect',
      ...(config || {})
    })
  }
  render() {
    this.nodeInstance = new GatewayNode({ model: this })
    this.currentEle = this.nodeInstance.render(createDom)
    return this.currentEle
  }
}
