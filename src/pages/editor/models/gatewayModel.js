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
          code: '通过',
          anchor: {
            ...configTool.defaultAnchor,
            anchor: 'Left',
            maxConnections: 1
          },
          endpoint: {
            ...configTool.defaultSourceEndpoint,
            dragAllowedWhenFull: false
          }
        },
        {
          code: '不通过',
          anchor: {
            ...configTool.defaultAnchor,
            anchor: 'Right',
            maxConnections: 1
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
