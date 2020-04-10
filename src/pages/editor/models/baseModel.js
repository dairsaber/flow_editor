export default class BaseModel {
  position
  data
  id
  endpointsConfig
  endpoints = []
  type
  name
  on //存储节点事件处理方法的
  pointUuids = []
  currentEle
  context
  cat
  nodeInstance
  constructor(config = {}) {
    this.position = config.position || [300, 300]
    this.data = config.data || { meta: {} }
    this.endpointsConfig = config.endpoints || []
    this.name = config.name
    this.id = config.id
    this.type = config.type
    this.on = config.on || {}
    this.context = config.context
    this.cat = config.cat
  }
  setPoint() {
    this.endpointsConfig.forEach(({ code, anchor, endpoint }) => {
      let uuid
      if (code) {
        uuid = `${this.id}.${code}`
      } else if (endpoint.isSource) {
        uuid = `${this.id}.from`
      } else if (endpoint.isTarget) {
        uuid = `${this.id}.to`
      }
      const ep = this.context.jsPlumb.addEndpoint(
        this.id,
        { uuid, ...anchor },
        endpoint
      )
      this.endpoints.push(ep)
      this.pointUuids.push(uuid)
    })
  }
  changePosition(x, y) {
    this.position = [x, y]
  }
  updateMeta(obj) {
    if (!obj) return
    const oldSourceConnections = this.context.jsPlumb.getConnections({
      source: this.id
    })
    const oldTargetConnections = this.context.jsPlumb.getConnections({
      target: this.id
    })
    this.data.meta = obj
    if (this.id !== obj.id) {
      this.id = obj.Id
      this.context.jsPlumb.setId(this.currentEle, this.id)
      this.resetEndPoint()
      this.reConnect([oldSourceConnections, oldTargetConnections], obj.Id)
    }
    this.nodeInstance.handleMetaChange && this.nodeInstance.handleMetaChange()
  }
  resetEndPoint() {
    this.endpoints.forEach(ep => {
      this.context.jsPlumb.deleteEndpoint(ep)
    })
    this.endpoints = []
    this.setPoint()
  }
  reConnect(oldConnections, newId) {
    // 当节点Id变化时修改连接
    const [source, target] = oldConnections
    if (source && source.length) {
      source.forEach(conn => {
        const meta = conn.getData()
        meta.From = newId
        this.context.connectEdgeByConfig(meta)
      })
    }
    if (target && target.length) {
      target.forEach(conn => {
        const meta = conn.getData()
        meta.To = newId
        this.context.connectEdgeByConfig(meta)
      })
    }
  }
}
