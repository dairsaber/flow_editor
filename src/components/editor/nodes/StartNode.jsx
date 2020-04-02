import { getClassName } from '../utils/cssNameSpace'
import { StartNode } from '../models'
export default {
  props: {
    config: StartNode
  },
  render() {
    const c = this.config
    const style = { left: `${c.position[0]}px`, top: `${c.position[1]}px` }
    return (
      <div
        style={style}
        draggable
        onMouseup={({ target }) => {
          c.changePosition(target.offsetLeft, target.offsetTop)
        }}
        class={getClassName('start')}
        id={c.id}
      >
        开始
      </div>
    )
  }
}
