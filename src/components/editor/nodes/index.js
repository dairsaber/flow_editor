import Vue from 'vue'
import { getClassName } from '../utils/cssNameSpace'
const VueInstance = new Vue()
console.log('VueInstance', VueInstance)

//eslint-disable-next-line
const h = VueInstance.$createElement
const defaultEndpoint = {
  paintStyle: {
    strokeStyle: '#1e8151',
    fill: '#1e8151',
    fillStyle: '#1e8151',
    radius: 4,
    lineWidth: 2
  },
  hoverPaintStyle: { stroke: 'blue' },
  connectorStyle: {
    strokeWidth: 2,
    stroke: '#61B7CF'
  },
  connectorHoverStyle: {
    strokeWidth: 2,
    stroke: 'red'
  }
}
const defaultAnchor = {
  connector: [
    'Flowchart',
    { gap: 4, cornerRadius: 5, alwaysRespectStubs: true }
  ],
  anchor: 'Bottom',
  maxConnections: -1,
  connectorOverlays: [
    [
      'Arrow',
      {
        width: 10,
        length: 10,
        location: 1
      }
    ],
    [
      'Arrow',
      {
        width: 10,
        length: 10,
        location: 0.5
      }
    ]
  ]
}
export class Node {
  position
  id
  data
  endpoints
  type
  name
  constructor(config = {}) {
    this.position = config.position || [0, 0]
    this.data = config.data
    this.endpoints = config.endpoints
    this.name = config.name
    this.type = config.type
  }

  setPoint(jsPlumb) {
    this.endpoints.forEach(({ anchor, endpoint }) => {
      jsPlumb.addEndpoint(
        this.name,
        { uuid: `${this.name}${anchor.anchor}`, ...anchor },
        endpoint
      )
    })
  }
}

export class StartNode extends Node {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          anchor: { isSource: true, ...defaultAnchor },
          endpoint: { ...defaultEndpoint }
        }
      ],
      type: 'start',
      ...(config || {})
    })
  }
  render() {
    return h('div', {
      attrs: { id: this.name, draggable: true },
      class: getClassName('start')
    })
  }
}

export class EffectNode extends Node {}
