import { jsPlumb } from 'jsplumb'
import { StartNode, ConditionNode } from '../editor/nodes'
import '../editor/index.less'
export default {
  data() {
    return { jsPlumb: jsPlumb.getInstance(), nodes: [] }
  },
  mounted() {
    const oneStartNode = new StartNode({
      name: 'item_left'
    })


    const oneConditionNode = new ConditionNode(
      {
        name: 'dadada',
        on: {
          //注册事件
          show: str => {
            alert(str)
          }
        }
      }, //config
      { conditions: [1, 2, 3, 4, 5] } //data
    )

    this.nodes = [
      oneStartNode.render(),
      oneConditionNode.render()
    ]

    this.$nextTick(() => {
      this.jsPlumb.ready(() => {
        oneStartNode.setPoint(this.jsPlumb)
        oneConditionNode.setPoint(this.jsPlumb)
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
