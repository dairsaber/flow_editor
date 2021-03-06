import './index.less'
import { Flow } from './utils/flow'
import { drop } from '../../directive'
import { CONTAINER_ID } from './config'
import Pannel from './components/attrsPannel/Pannel'
import Menu from './components/Menu'
import { Button } from 'ant-design-vue'
const flow = new Flow()
window.flow = flow
export default {
  data() {
    return { selected: [], selectedEdges: [] }
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
      active: this.handleNodeSelectedChange,
      edgeSelectedChange: this.handleEdgeSelectedChange
    })
    // await flow.init('/flowData/test.json')
    await flow.init()
    this.selected = flow.selected
    this.selectedEdges = flow.selectedEdges
  },
  methods: {
    // 节点移除后要做的事情
    handleAfterNodeRemove() {
      // console.log({ model, node })
      flow.unSelectAll()
    },
    //拖动添加节点
    onDrop(type, evt) {
      flow.createNode(type, evt)
    },
    // 当节点选择变化时
    handleNodeSelectedChange() {
      this.selected = flow.selected
    },
    //边选择变化
    handleEdgeSelectedChange() {
      this.selectedEdges = flow.selectedEdges
      console.log("handleEdgeSelectedChange -> this.selectedEdges", this.selectedEdges)
    },
    //
    handleContainerClick(evt) {
      //取消选择
      flow.unSelectAll()
      evt.stopPropagation()
      evt.preventDefault()
      return false
    },
    //新建流程图
    handleNew() {
      this.selected = []
      flow.reset()
    },
    //导入流程图配置
    handleImport() {
      flow.loadFromJson()
    },
    //导出流程图配置
    handleExport() {
      console.log(flow.exportJson())
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
              selectedEdges={this.selectedEdges}
              style="position:absolute;z-index:1;right:0;top:0;max-height:100%;overflow-y:auto"
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
