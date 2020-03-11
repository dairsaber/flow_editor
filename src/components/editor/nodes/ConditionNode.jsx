import { getClassName } from '../utils/cssNameSpace'
import { ConditionNode } from './index'
export default {
  props: {
    config: ConditionNode
  },
  methods: {
    handleShow() {
      const showFunc = this.config.on.show
      showFunc && showFunc('dadada')
    }
  },
  render(h) {
    return h(
      'div',
      {
        attrs: { id: this.config.name, draggable: true },
        class: getClassName('condition')
      },
      [
        h('div', { class: 'header' }, '条件节点'),
        (this.config.data.conditions || []).map((item, index) => {
          return h('div', { class: 'child' }, index)
        }),
        // 测试事件传输是否正常
        <button onClick={this.handleShow}>heheda</button>
      ]
    )
  }
}
