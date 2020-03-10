import { jsPlumb } from 'jsplumb'
import { StartNode } from '../editor/nodes'
import '../editor/index.less'
export default {
  data() {
    return { jsPlumb: jsPlumb.getInstance(), nodes: [] }
  },
  mounted() {
    const oneStartNode = new StartNode({
      name: 'item_left'
    })
    const twoStartNode = new StartNode({
      name: 'item_right'
    })
    this.nodes = [oneStartNode.render(), twoStartNode.render()]
    this.$nextTick(() => {
      this.jsPlumb.ready(() => {
        oneStartNode.setPoint(this.jsPlumb)
        twoStartNode.setPoint(this.jsPlumb)
        this.jsPlumb.setContainer('diagramContainer')
        this.jsPlumb.draggable(document.querySelectorAll('[draggable]'))
      })
    })
  },
  methods: {},
  render() {
    return (
      <div id="diagramContainer" style="height:800px">
        {this.nodes}
      </div>
    )
  }
}
