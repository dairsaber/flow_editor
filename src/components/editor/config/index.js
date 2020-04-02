// 基本连接线样式
const connectorPaintStyle = {
  strokeWidth: 2,
  stroke: '#61B7CF'
}

// 鼠标悬浮在连接线上的样式
const connectorHoverStyle = {
  strokeWidth: 2,
  stroke: 'red'
}
export const defaultSourceEndpoint = {
  isSource: true,
  paintStyle: {
    strokeStyle: '#bf235d',
    fill: '#bf235d',
    fillStyle: '#bf235d',
    radius: 4,
    lineWidth: 2
  },
  hoverPaintStyle: { fill: '#61B7CF' },
  connectorStyle: connectorPaintStyle,
  connectorHoverStyle: connectorHoverStyle
}
export const defaultAnchor = {
  connector: [
    'Flowchart',
    { gap: 5, cornerRadius: 5, alwaysRespectStubs: true }
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

export const defaultTargetPoint = {
  isTarget: true,
  paintStyle: {
    strokeStyle: '#1e8151',
    fill: '#1e8151',
    fillStyle: '#1e8151',
    radius: 4,
    lineWidth: 2
  },
  hoverPaintStyle: { stroke: 'blue' },
  connectorStyle: connectorPaintStyle,
  connectorHoverStyle: connectorHoverStyle
}
