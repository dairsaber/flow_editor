import './index.less'
import { Flow } from './utils/flow'
import { drop } from '../../directive'
import { CONTAINER_ID } from './config'
import Pannel from './components/attrsPannel/Pannel'
import Menu from './components/Menu'
import { Button } from 'ant-design-vue'
import { inputConfirm } from './utils/tips'
const flow = new Flow()
window.flow = flow
export default {
  data() {
    return { selected: [], selectedEdges: [], title: '' }
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
    this.updateAll()
  },
  methods: {
    // 节点移除后要做的事情
    handleAfterNodeRemove() {
      // console.log({ model, node })
      flow.unSelectAll()
    },
    updateAll() {
      this.updateSelectedNodes()
      this.updateSelectedEdges()
      this.updateTitle()
    },
    updateTitle() {
      this.title = flow.config.Title
    },
    updateSelectedNodes() {
      this.selected = flow.selected
    },
    updateSelectedEdges() {
      this.selectedEdges = flow.selectedEdges
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
    },
    //容器点击事件
    handleContainerClick(evt) {
      //取消选择
      flow.unSelectAll()
      evt.stopPropagation()
      evt.preventDefault()
      return false
    },
    //新建流程图
    handleNew() {
      flow.reset()
      this.updateAll()
    },
    //导入流程图配置
    async handleImport() {
      await flow.loadFromJson()
      this.updateAll()
    },
    //导出流程图配置
    handleExport() {
      console.log(flow.exportJson())
    },
    //更改flow标题
    async handleChangeFlowName() {
      const content = await inputConfirm('呵呵哒', flow.config.Title)
      if (content) {
        flow.config.Title = content
        this.updateTitle()
      }
    }
  },
  render() {
    return (
      <div>
        {/* 工具条 */}
        <div
          toolbar
          style="height:32px;background-color:grey;color:white;line-height:32px;display:flex;justify-content:space-between;padding:0 0.5rem"
        >
          <div>
            <Button.Group>
              <Button size="small" onClick={this.handleNew} icon="file">
                新建
              </Button>
              <Button size="small" onClick={this.handleImport} icon="import">
                导入
              </Button>
              <Button size="small" onClick={this.handleExport} icon="import">
                导出
              </Button>
            </Button.Group>
          </div>
          <div>
            <Button
              size="small"
              type="ghost"
              onClick={this.handleChangeFlowName}
            >
              {this.title}
            </Button>
          </div>
          <div>action</div>
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
