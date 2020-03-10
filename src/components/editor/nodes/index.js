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
    strokeWidth: 1,
    stroke: '#61B7CF'
  },
  connectorHoverStyle: {
    strokeWidth: 1,
    stroke: 'red'
  }
}
const defaultAnchor = {
  connector: [
    'Flowchart',
    {
      gap: 4,
      cornerRadius: 4,
      alwaysRespectStubs: true,
      midpoint: 0.2
    }
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

const defaultTargetPoint = {
  isTarget: true,
  paintStyle: {
    strokeStyle: '#1e8151',
    fill: '#61B7CF',
    fillStyle: '#1e8151',
    radius: 4,
    lineWidth: 2
  },
  hoverPaintStyle: { stroke: 'blue' }
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
          anchor: { ...defaultAnchor },
          endpoint: { isSource: true, ...defaultEndpoint }
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

export class EffectNode extends Node {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          anchor: { ...defaultAnchor, anchor: 'Top' },
          endpoint: getEndPointConfig(defaultTargetPoint)
        },
        {
          anchor: { ...defaultAnchor, anchor: 'Right' },
          endpoint: getEndPointConfig(defaultTargetPoint)
        },
        {
          anchor: { ...defaultAnchor, anchor: 'Left' },
          endpoint: getEndPointConfig(defaultTargetPoint)
        },
        {
          anchor: { ...defaultAnchor, anchor: 'Bottom' },
          endpoint: { ...defaultEndpoint, isSource: true }
        }
      ],
      type: 'Effect',
      ...(config || {})
    })
  }
  render() {
    return h(
      'div',
      {
        attrs: { id: this.name, draggable: true },
        class: getClassName('effect')
      },
      [
        h('div', {
          class: 'crop'
        })
      ]
    )
  }
}

//条件节点
export class ConditionNode extends Node {
  constructor(config, data) {
    const conditions = data.conditions || []
    super({
      data,
      endpoints: [
        {
          anchor: { ...defaultAnchor, anchor: 'Top' },
          endpoint: getEndPointConfig(defaultTargetPoint)
        },
        ...conditions.map((item, index) => {
          return {
            anchor: {
              ...defaultAnchor,
              anchor: [0, 0, 0, 0, 0, 10 + (index + 1) * 20]
            },
            endpoint: getEndPointConfig({ isSource: true })
          }
        })
      ],
      type: 'Effect',
      ...(config || {})
    })
  }
  render() {
    return h(
      'div',
      {
        attrs: { id: this.name, draggable: true },
        class: getClassName('condition')
      },
      [
        h('div', { class: 'header' }, '条件节点'),
        (this.data.conditions || []).map((item, index) => {
          return h('div', { class: 'child' }, index)
        })
      ]
    )
  }
}
function getEndPointConfig(conifg = {}) {
  return { ...defaultEndpoint, ...conifg }
}
