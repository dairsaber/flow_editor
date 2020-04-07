import { Flow } from './utils/flow'
import Panel from './components/Panel'
import './index.less'
import { drop } from '../../directive'
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
    handleAfterNodeRemove(model, node) {
      console.log({ model, node })
      //TODO 节点移除后要做的事情
    },
    handleClick() {
      console.log(flow)
      console.log(flow.exportJson())
    },
    //拖动添加节点
    onDrop(type, evt) {
      // flow
      const model = flow.createNode(type, evt)
      this.$nextTick(() => {
        flow.registerNode(model)
      })
    }
  },
  render() {
    return (
      <div>
        <div toolbar style="height:32px;background-color:grey"></div>
        <div style="height:800px;overflow:hidden;display:flex">
          <Panel />
          <div
            id="diagramContainer"
            style="height:800px;overflow:hidden;flex:1"
            v-drop={this.onDrop}
          ></div>
          <button
            style="position:absolute;top:0;right:0"
            onClick={this.handleClick}
          >
            测试
          </button>
        </div>
      </div>
    )
  }
}
