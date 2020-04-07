import { getClassName } from '../utils/cssNameSpace'
import { BaseNode } from './BaseNode'
export class TaskNode extends BaseNode {
  constructor({ model }) {
    super({ model })
  }
  render(h) {
    const model = this.model || {}
    const style = {
      left: `${model.position[0]}px`,
      top: `${model.position[1]}px`
    }
    const childName = (this.model.data.meta || {}).Name || '未知任务'
    return h(
      'div',
      {
        className: getClassName('task'),
        style,
        attrs: { id: model.id, nodeDraggable: true },
        on: { dblclick: this.remove, mouseup: this.upDatePosition }
      },
      childName
    )
  }
}
