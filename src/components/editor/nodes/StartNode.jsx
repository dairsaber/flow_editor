import { getClassName } from '../utils/cssNameSpace'
import { StartNode } from './index'
export default {
  props: {
    config: StartNode
  },
  render() {
    const c = this.config
    return <div draggable class={getClassName('start')} id={c.name}>xxx</div>
  }
}
