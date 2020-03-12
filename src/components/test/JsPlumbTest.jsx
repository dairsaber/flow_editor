import { jsPlumb } from 'jsplumb'
import { StartNode, ConditionNode,EndNode } from '../editor/models'
import '../editor/index.less'
export default {
  data() {
    return { jsPlumb: jsPlumb.getInstance(), nodes: [] }
  },
  mounted() {
    const startNode = new StartNode({
      name: 'start'
    })
    const endNode = new EndNode({
      name: 'end'
    })
    const conditionNode = new ConditionNode(
      {
        name: 'dadada',
        on: {
          //注册事件
        }
      }, //config
      { conditions: [1, 2, 3, 4, 5] } //data
    )

    this.nodes = [startNode.render(), conditionNode.render(),endNode.render()]

    this.$nextTick(() => {
      this.jsPlumb.ready(() => {
        startNode.setPoint(this.jsPlumb)
        conditionNode.setPoint(this.jsPlumb),
        endNode.setPoint(this.jsPlumb)
        this.jsPlumb.setContainer('diagramContainer')
        this.jsPlumb.draggable(document.querySelectorAll('[draggable]'), {
          containment: 'diagramContainer',
          grid: [10, 10]
        })
      })
    })
  },
  methods: {},
  render() {
    return (
      <div style="height:800px;overflow:hidden">
        <div id="diagramContainer" style="height:800px">
          {this.nodes}
        </div>
      </div>
    )
  }
}
