import BaseModel from './baseModel'
import * as configTool from '../config'
import Gateway from '../nodes/GatewayNode'

//条件节点
export class GatewayModel extends BaseModel {
  constructor(config, data) {
    super({
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
    return this.$createElement(Gateway, { props: { config: this } })
  }
}
