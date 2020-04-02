import { Flow } from './utils/flow'
import './index.less'
const flow = new Flow()
export default {
  data() {
    return {
      nodes: []
    }
  },
  async mounted() {
    await flow.loadData('/flowData/VideoProblemFlowTest.json')
    this.nodes = flow.nodes
    this.$nextTick(() => {
      flow.mount()
    })
  },
  methods: {
    handleClick() {
      console.log(flow)
    }
  },
  render() {
    return (
      <div style="height:800px;overflow:hidden">
        <div id="diagramContainer" style="height:800px">
          {this.nodes}
        </div>
        <button
          style="position:absolute;top:0;right:0"
          onClick={this.handleClick}
        >
          测试
        </button>
      </div>
    )
  }
}
