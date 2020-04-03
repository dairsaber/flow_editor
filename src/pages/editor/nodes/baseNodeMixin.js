/* eslint-disable  */
import { confirm } from '../utils/tips'
export default {
  methods: {
    async remove() {
      const isok = await confirm('节点移除警告', '确定要移除此节点么？')
      if (!isok) return
      const model = this.config
      const context = model.context
      context.jsPlumb.remove(model.id)
      model.endpoints.forEach(ep => {
        context.jsPlumb.deleteEndpoint(ep)
      })
      const index = context.models.indexOf(model)
      if (index >= 0) {
        context.models.splice(index, 1)
      }
      const node = context.nodes.find(x => x.data.props.config === model)
      const nodeIndex = context.nodes.indexOf(node)
      if (nodeIndex >= 0) {
        context.nodes.splice(nodeIndex, 1)
      }

      const removeFunc = context.events['nodeRemove']

      removeFunc && removeFunc(model, node)
    },
    edit() {}
  }
}
