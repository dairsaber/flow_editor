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
  connectorStyle: {
    strokeWidth: 2,
    stroke: '#61B7CF'
  },
  connectorHoverStyle: {
    strokeWidth: 2,
    stroke: 'red'
  }
}
export const defaultAnchor = {
  connector: [
    'Flowchart',
    {
      cornerRadius: 4,
      alwaysRespectStubs: true
      // midpoint: 0.2
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

export const defaultTargetPoint = {
  isTarget: true,
  paintStyle: {
    strokeStyle: '#1e8151',
    fill: '#1e8151',
    fillStyle: '#1e8151',
    radius: 4,
    lineWidth: 2
  },
  hoverPaintStyle: { stroke: 'blue' }
}