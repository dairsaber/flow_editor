import './index.less'
import { Flow } from './utils/flow'
import { drop } from '../../directive'
import { CONTAINER_ID } from './config'
import Pannel from './components/attrsPannel/Pannel'
import Menu from './components/Menu'
const flow = new Flow()
export default {
  data() {
    return { selected: [] }
  },
  provide() {
    return {
      flow
    }
  },
  directives: { drop },
  async mounted() {
    flow.registerListenner({
      //监听节点移除
      nodeRemove: this.handleAfterNodeRemove,
      active: this.handleSelectedChange
    })
    await flow.init('/flowData/test.json')
    this.selected = flow.selected
  },
  methods: {
    //TODO 节点移除后要做的事情
    handleAfterNodeRemove(model, node) {
      console.log({ model, node })
    },
    //测试
    handleTest() {
      console.log(flow)
      console.log(flow.exportJson())
    },
    //拖动添加节点
    onDrop(type, evt) {
      flow.createNode(type, evt)
    },
    // TODO 当节点选择变化时
    handleSelectedChange(active, model) {
      console.log({ active, model, flow })
      this.selected = flow.selected
    },
    //
    handleContainerClick(evt) {
      //取消选择
      flow.unSelectAll()
      evt.stopPropagation()
      evt.preventDefault()
      return false
    }
  },
  render() {
    return (
      <div>
        {/* 工具条 */}
        <div
          toolbar
          style="height:32px;background-color:grey;color:white;line-height:32px;text-align:center"
        >
          {(this.selected[0] && this.selected[0].id) || '暂无选择节点'}
        </div>
        <div style="flex:1;overflow:hidden;display:flex">
          {/* 节点面板 */}
          <Menu />
          <div style="display:flex;flex:1;position:relative">
            {/* 属性面板 */}
            <Pannel
              selected={this.selected}
              style="position:absolute;z-index:1;right:0;top:0;height:50%;overflow-y:auto"
            />
            {/* 编辑器容器 内部不要放dom */}
            <div
              id={CONTAINER_ID}
              style="overflow:hidden;flex:1"
              v-drop={this.onDrop}
              onClick={this.handleContainerClick}
            ></div>
          </div>
          {/* 测试按钮 */}
          <button
            style="position:absolute;top:0;right:0"
            onClick={this.handleTest}
          >
            测试
          </button>
        </div>
      </div>
    )
  }
}
