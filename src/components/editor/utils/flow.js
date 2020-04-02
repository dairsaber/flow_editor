/* eslint-disable no-debugger */
import { jsPlumb } from 'jsplumb'
import * as jsPlumbUtils from './load'
import { request } from './request'
import { saveJSON } from './file'

export class Flow {
  nodes = []
  models = []
  edges = {}
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
  exportJson() {
    const { Id, Version, Title } = this.config
    const otherInfo = this.models.reduce(
      (prev, current) => {
        const cat = current.cat
        if (!prev[cat]) {
          prev[cat] = []
        }
        prev[cat].push(current.data.meta)
        prev.Position[current.id] = current.position
        return prev
      },
      { Position: {} }
    )
    const Transitions = Object.values(this.edges)
    const data = { Id, Version, Title, ...otherInfo, Transitions }
    saveJSON(data, `${data.Title}.json`)
    return data
  }
}
