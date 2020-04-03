import { Flow } from './utils/flow'
import Panel from './components/Panel'
import './index.less'
import { drop } from '../../directive'
const flow = new Flow()
export default {
  data() {
    return {
      nodes: []
    }
  },
  directives: { drop },
  async mounted() {
    await flow.loadData('/flowData/test.json')
    this.nodes = flow.nodes
    this.$nextTick(() => {
      flow.mount()
    })
  },
  methods: {
    handleClick() {
      console.log(flow)
      console.log(flow.exportJson())
    },
    onDrop(type, evt) {
      console.log(type, evt)
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
          >
            {this.nodes}
          </div>
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
