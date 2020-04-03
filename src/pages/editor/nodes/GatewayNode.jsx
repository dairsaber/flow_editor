/* eslint-disable no-debugger */
import { getClassName } from '../utils/cssNameSpace'
import { GatewayModel } from '../models'
import baseMixin from './baseNodeMixin'
export default {
  mixins: [baseMixin],
  props: {
    config: GatewayModel
  },
  data() {
    return {
      //   conditions: []
      ...this.config.data
    }
  },
  render(h) {
    const c = this.config
    const style = { left: `${c.position[0]}px`, top: `${c.position[1]}px` }
    return h(
      'div',
      {
        style: style,
        attrs: { id: c.id, nodeDraggable: true },
        class: getClassName('gateway'),
        on: {
          dblclick: this.remove,
          mouseup: () => {
            const target = document.querySelector(`#${c.id}`)
            c.changePosition(target.offsetLeft, target.offsetTop)
          }
        }
      },
      [<div>通过</div>, <div>不通过</div>]
    )
  }
}
