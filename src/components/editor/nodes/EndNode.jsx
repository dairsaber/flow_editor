import { getClassName } from '../utils/cssNameSpace'
import { EndNode } from '../models'
export default {
  props: {
    config: EndNode
  },
  render() {
    const c = this.config
    const style = { left: `${c.position[0]}px`, top: `${c.position[1]}px` }
    return (
      <div
        draggable
        style={style}
        onMouseup={({ target }) => {
          c.changePosition(target.offsetLeft, target.offsetTop)
        }}
        class={getClassName('end')}
        id={c.id}
      >
        结束
      </div>
    )
  }
}
