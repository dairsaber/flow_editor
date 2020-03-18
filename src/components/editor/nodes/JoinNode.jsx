import { getClassName } from '../utils/cssNameSpace'
import { JoinNode } from '../models'
export default {
  props: {
    config: JoinNode
  },
  render() {
    const c = this.config
    return <div draggable class={getClassName('join')} id={c.name}>聚合</div>
  }
}
