import { getClassName } from '../utils/cssNameSpace'
import { StartModel } from '../models'
import baseMixin from './baseNodeMixin'
export default {
  mixins: [baseMixin],
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
        onDblclick={this.remove}
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
