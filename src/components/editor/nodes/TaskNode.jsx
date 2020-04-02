import { getClassName } from '../utils/cssNameSpace'
import { TaskNode } from '../models'
export default {
  props: {
    config: TaskNode
  },
  render() {
    const c = this.config
    const meta = c.data.meta || {}
    const style = { left: `${c.position[0]}px`, top: `${c.position[1]}px` }
    return (
      <div
        style={style}
        draggable
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
