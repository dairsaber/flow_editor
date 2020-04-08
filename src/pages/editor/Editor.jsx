import './index.less'
import { Flow } from './utils/flow'
import { drop } from '../../directive'
import { CONTAINER_ID } from './config'
import Pannel from './components/attrsPannel/Pannel'
import Menu from './components/Menu'
import { Button } from 'ant-design-vue'
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
    },
    handleNew() {
      this.selected = []
      flow.reset()
    },
    handleImport() {
      flow.loadFromJson()
    },
    handleExport() {
      flow.exportJson()
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
          <Button size="small" onClick={this.handleNew} icon="file">
            新建
          </Button>
          &emsp;
          <Button size="small" onClick={this.handleImport} icon="import">
            导入
          </Button>
          &emsp;
          <Button size="small" onClick={this.handleExport} icon="import">
            导出
          </Button>
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
        </div>
      </div>
    )
  }
}
