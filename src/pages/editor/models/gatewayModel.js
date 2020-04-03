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
          anchor: {
            ...configTool.defaultAnchor,
            anchor: 'left',
            maxConnections: 1
          },
          endpoint: {
            ...configTool.defaultSourceEndpoint,
            dragAllowedWhenFull: false
          }
        },
        {
          anchor: {
            ...configTool.defaultAnchor,
            anchor: 'right',
            maxConnections: 1
          },
          endpoint: {
            ...configTool.defaultSourceEndpoint,
            dragAllowedWhenFull: false
          }
        },
      ],
      type: 'Effect',
      ...(config || {})
    })
  }
  render() {
    return this.$createElement(Gateway, { props: { config: this } })
  }
}
