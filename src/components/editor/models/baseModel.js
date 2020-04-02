/* eslint-disable no-debugger */
import Vue from 'vue'

export default class Node {
  $createElement = new Vue().$createElement
  position
  data
  id
  endpoints
  type
  name
  on //存储节点事件处理方法的
  points = []
  context
  constructor(config = {}) {
    this.position = config.position || [300, 300]
    this.data = config.data
    this.endpoints = config.endpoints
    this.name = config.name
    this.id = config.id
    this.type = config.type
    this.on = config.on || {}
    this.context = config.context
  }
  setPoint() {
    this.endpoints.forEach(({ code, anchor, endpoint }) => {
      let uuid
      if (code) {
        uuid = `${this.id}.${code}`
      } else if (endpoint.isSource) {
        uuid = `${this.id}.from`
      } else if (endpoint.isTarget) {
        uuid = `${this.id}.to`
      }
      this.context.jsPlumb.addEndpoint(this.id, { uuid, ...anchor }, endpoint)
      this.points.push(uuid)
    })
  }
  changePosition(x, y) {
    this.position = [x, y]
  }
}
