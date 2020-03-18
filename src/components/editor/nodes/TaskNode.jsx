import { getClassName } from '../utils/cssNameSpace'
import { TaskNode } from '../models'
export default {
  props: {
    config: TaskNode
  },
  render() {
    const c = this.config
    return (
      <div draggable class={getClassName('task')} id={c.name}>
        任务
      </div>
    )
  }
}
