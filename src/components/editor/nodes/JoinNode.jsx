import { getClassName } from '../utils/cssNameSpace'
import { JoinNode } from '../models'
export default {
  props: {
    config: JoinNode
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
        class={getClassName('join')}
        id={c.id}
      >
        聚合
      </div>
    )
  }
}
