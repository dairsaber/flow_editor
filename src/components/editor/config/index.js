export const defaultEndpoint = {
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
export const defaultAnchor = {
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

export const defaultTargetPoint = {
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

export function getEndPointConfig(conifg = {}) {
  return { ...defaultEndpoint, ...conifg }
}