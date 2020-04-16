/* eslint-disable  */
import { confirm } from '../utils/tips'
export class BaseNode {
  model
  selected = false
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
  updatePosition = () => {
    const currentEle = this.model.currentEle
    this.model.changePosition(currentEle.offsetLeft, currentEle.offsetTop)
  }
  //选择切换状态
  selectedChange = (bool, multiple) => {
    if (this.selected === bool) return
    const context = this.model.context
    const currentSelected = context.selected
    //是否激活
    if (bool) {
      //是否存在
      const isExist = currentSelected.includes(this.model)
      if (!isExist) {
        //是否多选
        if (!multiple) {
          currentSelected.forEach(model => {
            model.nodeInstance.active(false)
          })
          this.model.context.selected = []
        }
        this.active(true)
      }
    } else {
      this.active(false)
    }
  }
  //节点被激活
  active = active => {
    if (active) {
      this.model.currentEle.classList.add('node-active')
    } else {
      this.model.currentEle.classList.remove('node-active')
    }
    this.model.context.selected.push(this.model)
    //安插激活状态钩子
    this.model.context.afterNodeSelectedChange(active, this.model)
  }
  //处理节点被点击之后的事件
  handleSelect = (ele, evt) => {
    const multiple = this.model.context.multiple
    this.selectedChange(!this.selected, multiple)
    evt.stopPropagation()
    evt.preventDefault()

    return false
  }
}

//box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
