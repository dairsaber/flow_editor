import { jsPlumb } from 'jsplumb'
import { StartNode, ConditionNode, EndNode } from '../editor/models'
import '../editor/index.less'
export default {
  data() {
    return { jsPlumb: jsPlumb.getInstance(), nodes: [], nodesData: [] }
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
      { conditions: [{ code: 1 }, { code: 2 }] } //data
    )

    this.nodes = [startNode.render(), conditionNode.render(), endNode.render()]
    this.nodesData.push(...[startNode, endNode, conditionNode]) 
    this.$nextTick(() => {
      this.jsPlumb.ready(() => {
        startNode.setPoint(this.jsPlumb)
        conditionNode.setPoint(this.jsPlumb), endNode.setPoint(this.jsPlumb)
        this.jsPlumb.setContainer('diagramContainer')
        this.jsPlumb.draggable(document.querySelectorAll('[nodeDraggable]'), {
          containment: 'diagramContainer',
          grid: [10, 10]
        })
      })
    })
  },
  methods: {
    handleClick() {
      console.log(this.jsPlumb)
      console.log(this.nodesData)
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
