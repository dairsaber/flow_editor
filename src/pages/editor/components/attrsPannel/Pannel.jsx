import BasicPannel from './BasicPannel'
export default {
  props: {
    selected: Array
  },
  computed: {
    pannel() {
      const selected = this.selected || []
      const multiSelectedItem = selected.length > 1
      const onlySelectedOne = selected.length === 1
      if (multiSelectedItem) {
        return null
      }
      if (onlySelectedOne) {
        const [selectedNode] = selected
        const basicPannel = <BasicPannel item={selected[0]} />
        switch (true) {
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
    getPannel(customPannel, basicPannel) {
      return (
        <div style="width:240px;background-color:white;border-radius:4px 0 0 4px;border-left:1px solid #eee">
          {[customPannel, basicPannel]}
        </div>
      )
    }
  },
  render() {
    return this.pannel
  }
}
