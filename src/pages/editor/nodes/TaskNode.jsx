import { getClassName } from '../utils/cssNameSpace'
import { TaskModel } from '../models'
import baseMixin from './baseNodeMixin'
export default {
  mixins: [baseMixin],
  props: {
    config: TaskModel
  },
  render() {
    const c = this.config
    const meta = c.data.meta || {}
    const style = { left: `${c.position[0]}px`, top: `${c.position[1]}px` }
    return (
      <div
        style={style}
        nodeDraggable
        onDblclick={this.remove}
        onMouseup={({ target }) => {
          c.changePosition(target.offsetLeft, target.offsetTop)
        }}
        class={getClassName('task')}
        id={c.id}
      >
        {meta.Name || '未知任务'}
      </div>
    )
  }
}
