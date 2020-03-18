import { getClassName } from '../utils/cssNameSpace'
import { ConditionNode } from '../models'
import { message } from 'ant-design-vue'
export default {
  props: {
    config: ConditionNode
  },
  data() {
    return {
      //   conditions: []
      ...this.config.data
    }
  },
  methods: {
    handleShow() {
      this.config.addCondtion({ code: Date.now() })
      message.success('添加节点成功')
    }
  },
  //   watch: {
  //     config: {
  //       immediate: true,
  //       handler(val) {
  //         if (val) {
  //           this.conditions = val.data.conditions
  //         }
  //       }
  //     }
  //   },
  render(h) {
    return h(
      'div',
      {
        attrs: { id: this.config.name, draggable: true },
        class: getClassName('condition')
      },
      [
        h('div', { class: 'header' }, '条件节点'),
        (this.conditions || []).map(item => {
          return h('div', { class: 'child' }, item.code)
        }),
        // 测试事件传输是否正常
        <button onClick={this.handleShow}>添加条件</button>
      ]
    )
  }
}
