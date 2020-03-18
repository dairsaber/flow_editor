import { jsPlumb } from 'jsplumb'
import * as jsPlumbUtils from './utils/load'
import { request } from './utils/request'
import './index.less'
export default {
  data() {
    return {
      jsPlumb: jsPlumb.getInstance(),
      config: null,
      nodes: [],
      models: []
    }
  },
  mounted() {
    request('/flowData/VideoProblemFlowTest.json').then(({ data }) => {
      // eslint-disable-next-line no-debugger
      this.config = data
      this.models = jsPlumbUtils.createNodesModel(data)
      console.log("mounted -> this.models ", this.models )
      
      this.nodes = jsPlumbUtils.createNodes(this.models)
      console.log("mounted -> this.nodes", this.nodes)
      this.$nextTick(() => {
        this.jsPlumb.ready(() => {
          jsPlumbUtils.initEndpoints(this.jsPlumb, this.models)
          jsPlumbUtils.registerOther(this.jsPlumb)
        })
      })
    })
  },
  methods: {
    handleClick() {
      console.log(this.jsPlumb)
      console.log(this.models)
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
