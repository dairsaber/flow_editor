import { getClassName } from '../utils/cssNameSpace'
import { ConditionNode } from '../models'
import { message } from 'ant-design-vue'
import { jsPlumb } from 'jsplumb'

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
    const c = this.config
    const style = { left: `${c.position[0]}px`, top: `${c.position[1]}px` }
    return h(
      'div',
      {
        style: style,
        attrs: { id: c.id, draggable: true },
        class: getClassName('condition')
      },
      [
        h(
          'div',
          {
            class: 'header',
            on: {
              mouseup: ({ target }) => {
                c.changePosition(target.offsetLeft, target.offsetTop)
              },
              dblclick:()=>{
                jsPlumb.remove(c.id)
              }
            }
          },
          '条件节点'
        ),
        (this.conditions || []).map(item => {
          return h(
            'div',
            { class: 'child', attrs: { code: item.code } },
            item.code
          )
        }),
        // 测试事件传输是否正常
        <button onClick={this.handleShow}>添加条件</button>
      ]
    )
  }
}
