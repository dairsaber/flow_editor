import BasicPannel from './BasicPannel'
import BasicEdgePannel from './BasicEdgePannel'
// const width = 300
export default {
  props: {
    selected: Array,
    selectedEdges: Array
  },
  computed: {
    pannel() {
      const selected = this.selected || []
      const selectedEdges = this.selectedEdges || []
      const allSelected = selected.concat(selectedEdges)
      const multiSelectedItem = allSelected.length > 1
      const onlySelectedOne = allSelected.length === 1
      //多选模式下不展示pannel
      if (multiSelectedItem) {
        return null
      }
      //单选模式下
      if (onlySelectedOne) {
        const [selectedNode] = selected
        const [selectedConnection] = selectedEdges
        let basicPannel = null
        if (selectedNode) {
          basicPannel = <BasicPannel item={selectedNode} />
        } else {
          basicPannel = <BasicEdgePannel item={selectedConnection} />
        }
        switch (true) {
          case !!selectedConnection:
            return this.getEdgePannel(basicPannel)
          case !selectedNode:
            return null
          case selectedNode.type === 'StartEvent':
          case selectedNode.type === 'EndEvent':
          case selectedNode.type === 'JoinGateway':
          case selectedNode.type === 'SplitGateway':
            return this.getPannel(null, basicPannel)
          case selectedNode.type === 'UserTask':
            return this.getPannel(null, basicPannel)
          default:
            return null
        }
      }
      return null
    }
  },
  methods: {
    getEdgePannel(pannel) {
      return (
        <div style="width:300px;background-color:white;border-radius:4px 0 0 4px;border-left:1px solid #eee">
          {pannel}
        </div>
      )
    },
    getPannel(customPannel, basicPannel) {
      return (
        <div style="width:300px;background-color:white;border-radius:4px 0 0 4px;border-left:1px solid #eee">
          {[customPannel, basicPannel]}
        </div>
      )
    }
  },
  render() {
    return this.pannel
  }
}
 