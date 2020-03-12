import { getClassName } from '../utils/cssNameSpace'
import { StartNode } from '../models'
export default {
  props: {
    config: StartNode
  },
  render() {
    const c = this.config
    return <div draggable class={getClassName('start')} id={c.name}>开始</div>
  }
}
