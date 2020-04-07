/* eslint-disable  */
import { confirm } from '../utils/tips'
export class BaseNode {
  model
  constructor({ model }) {
    this.model = model
  }
  //移除节点
  remove = async () => {
    const isok = await confirm('节点移除警告', '确定要移除此节点么？')
    if (!isok) return
    const context = this.model.context
    context.jsPlumb.remove(this.model.id)
    //移除 model
    const index = context.models.indexOf(this.model)
    if (index >= 0) {
      context.models.splice(index, 1)
    }
    const removeFunc = context.events['nodeRemove']
    removeFunc && removeFunc(this.model)
  }
  edit = () => {}
  //更新节点位置
  upDatePosition = () => {
    const currentEle = this.model.currentEle
    this.model.changePosition(currentEle.offsetLeft, currentEle.offsetTop)
  }
}
