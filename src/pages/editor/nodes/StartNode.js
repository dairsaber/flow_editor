import { getClassName } from '../utils/cssNameSpace'
import { BaseNode } from './BaseNode'
export class StartNode extends BaseNode {
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
        className: getClassName('start'),
        style,
        attrs: { id: model.id,nodeDraggable:true },
        on: { dblclick: this.remove, mouseup: this.upDatePosition }
      },
      '开始'
    )
  }
}
