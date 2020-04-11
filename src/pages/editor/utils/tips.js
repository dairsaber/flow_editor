import { Modal, message, Input } from 'ant-design-vue'
import Vue from 'vue'
const VueInstance = new Vue()
export function confirm(title, content) {
  return new Promise(r => {
    Modal.confirm({
      title,
      content,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        r(true)
      },
      onCancel() {
        r(false)
      }
    })
  })
}
//输入确认框
export function inputConfirm(title, inputContent) {
  const createElement = VueInstance.$createElement
  return new Promise(r => {
    let input = inputContent
    Modal.confirm({
      title,
      content: createElement(Input, {
        props: { defaultValue: input },
        on: {
          change: ({ target: { value } }) => {
            input = value
          }
        }
      }),
      icon:'edit',
      cancelText: '取消',
      okText: '提交',
      onOk() {
        if (input) {
          r(input)
        } else {
          error('当前输入不能为空')
          r(false)
        }
      },
      onCancel() {
        r(false)
      }
    })
  })
}

export function success(content = '') {
  message.success(content)
}
export function warn(content = '') {
  message.warn(content)
}
export function error(content = '') {
  message.error(content)
}
