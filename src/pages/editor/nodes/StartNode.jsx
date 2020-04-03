import { getClassName } from '../utils/cssNameSpace'
import { StartModel } from '../models'
export default {
  props: {
    config: StartModel
  },
  render() {
    const c = this.config
    const style = { left: `${c.position[0]}px`, top: `${c.position[1]}px` }
    return (
      <div
        style={style}
        nodeDraggable
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
