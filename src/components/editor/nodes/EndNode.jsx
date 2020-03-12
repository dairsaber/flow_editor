import { getClassName } from '../utils/cssNameSpace'
import { EndNode } from '../models'
export default {
  props: {
    config: EndNode
  },
  render() {
    const c = this.config
    return <div draggable class={getClassName('end')} id={c.name}>结束</div>
  }
}
