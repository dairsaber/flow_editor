export const CONTAINER_ID = 'diagramContainer'

// 基本连接线样式
export const connectorPaintStyle = {
  strokeWidth: 3,
  stroke: '#61B7CF'
}
//
export const activeConnectorPaintStyle = {
  strokeWidth: 5,
  stroke: 'red'
}
// 鼠标悬浮在连接线上的样式
const connectorHoverStyle = {
  strokeWidth: 3,
  stroke: 'red'
}
// 默认源endPoint配置
export const defaultSourceEndpoint = {
  isSource: true,
  paintStyle: {
    strokeStyle: '#1e8151',
    fill: '#bf235d',
    fillStyle: '#bf235d',
    radius: 6,
    lineWidth: 2
  },
  hoverPaintStyle: { fill: '#61B7CF' },
  connectorStyle: connectorPaintStyle,
  connectorHoverStyle: connectorHoverStyle
}
// 默认锚点配置
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
    ]
  ]
}
// 默认目标endPoint配置
export const defaultTargetPoint = {
  isTarget: true,
  paintStyle: {
    strokeStyle: '#bf235d',
    fill: '#1e8151',
    fillStyle: '#1e8151',
    radius: 6,
    lineWidth: 2
  },
  hoverPaintStyle: { stroke: 'blue' },
  connectorStyle: connectorPaintStyle,
  connectorHoverStyle: connectorHoverStyle
}
// 节点类型
export const NODE_TYPES = [
  { type: 'StartEvent', cat: 'Events', label: '开始' },
  { type: 'EndEvent', cat: 'Events', label: '结束' },
  { type: 'SplitGateway', cat: 'Gateways', label: '条件' },
  { type: 'JoinGateway', cat: 'Gateways', label: '聚合' },
  { type: 'UserTask', cat: 'Tasks', label: '任务' }
]

export const NODE_TYPES_MAP = NODE_TYPES.reduce((prev, current) => {
  return { ...prev, [current.type]: current }
}, {})

export const GRID = [20, 20]
