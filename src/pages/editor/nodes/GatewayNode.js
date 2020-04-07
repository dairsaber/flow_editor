import { getClassName } from '../utils/cssNameSpace'
import { BaseNode } from './BaseNode'
export class GatewayNode extends BaseNode {
  constructor({ model }) {
    super({ model })
  }
  render(h) {
    const model = this.model || {}
    const style = {
      left: `${model.position[0]}px`,
      top: `${model.position[1]}px`
    }
    return h(
      'div',
      {
        className: getClassName('gateway'),
        style,
        attrs: { id: model.id, nodeDraggable: true },
        on: {
          dblclick: this.remove,
          mouseup: this.updatePosition,
          click: this.hanldSelect
        }
      },
      `<div>通过</div><div>不通过</div>`
    )
  }
}
