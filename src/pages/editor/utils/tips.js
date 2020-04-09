import { Modal, message } from 'ant-design-vue'

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

export function success(content = '') {
  message.success(content)
}
export function warn(content = '') {
  message.warn(content)
}
export function error(content = '') {
  message.error(content)
}
