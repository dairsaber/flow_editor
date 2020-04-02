import { jsPlumb } from 'jsplumb'
import * as jsPlumbUtils from './load'
import { request } from './request'

export class Flow {
  nodes = []
  models = []
  edges = []
  config
  jsPlumb
  constructor() {
    this.jsPlumb = jsPlumb.getInstance()
  }
  async loadData(path) {
    const { data } = await request(path)
    this.config = data
    this.models = jsPlumbUtils.createNodesModel(this, this.config)
    this.nodes = jsPlumbUtils.createNodes(this, this.models)
  }
  mount() {
    return new Promise(r => {
      this.jsPlumb.ready(() => {
        jsPlumbUtils.registerEvents(this)
        jsPlumbUtils.initEndpoints(this, this.models)
        jsPlumbUtils.registerOther(this)
        jsPlumbUtils.connectNodes(this, this.config)
        r()
      })
    })
  }
}
