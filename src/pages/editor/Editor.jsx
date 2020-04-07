import './index.less'
import { Flow } from './utils/flow'
import { drop } from '../../directive'
import { CONTAINER_ID } from './config'
import Panel from './components/Panel'
const flow = new Flow()
export default {
  data() {
    return {}
  },
  directives: { drop },
  async mounted() {
    flow.registerListenner({
      //监听节点移除
      nodeRemove: this.handleAfterNodeRemove
    })
    await flow.init('/flowData/test.json')
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
        <div toolbar style="height:32px;background-color:grey"></div>
        <div style="flex:1;overflow:hidden;display:flex">
          <Panel />
          <div
            id={CONTAINER_ID}
            style="overflow:hidden;flex:1"
            v-drop={this.onDrop}
            onClick={this.handleContainerClick}
          ></div>
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
