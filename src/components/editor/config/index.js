/* // 鼠标悬浮在连接线上的样式
const connectorHoverStyle = {
  lineWidth: 2,
  strokeStyle: 'red',
  outlineWidth: 10,
  outlineColor: ''
}

const baseStyle = {
  endpoint: ['Dot', {
    radius: 8,
    fill: 'pink'
  }], // 端点的形状
  connectorStyle: connectorPaintStyle, // 连接线的颜色，大小样式
  connectorHoverStyle: connectorHoverStyle,
  paintStyle: {
    strokeStyle: '#1e8151',
    stroke: '#7AB02C',
    fill: 'pink',
    fillStyle: '#1e8151',
    radius: 6,
    lineWidth: 2
  }, // 端点的颜色样式
  // hoverPaintStyle: {
  //   outlineStroke: 'pink'
  // },
  hoverPaintStyle: { stroke: 'blue' },
  isSource: true, // 是否可以拖动（作为连线起点）
  connector: ['Flowchart', { gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],  // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
  isTarget: true, // 是否可以放置（连线终点）
  maxConnections: -1, // 设置连接点最多可以连接几条线
  connectorOverlays: [
    ['Arrow', {
      width: 10,
      length: 10,
      location: 1
    }],
    ['Arrow', {
      width: 10,
      length: 10,
      location: 0.2
    }],
    ['Arrow', {
      width: 10,
      length: 10,
      location: 0.7
    }],
    ['Label', {
      label: '',
      cssClass: '',
      labelStyle: {
        color: 'red'
      },
      events: {
        click: function (labelOverlay, originalEvent) {
          console.log('click on label overlay for :' + labelOverlay.component)
          console.log(labelOverlay)
          console.log(originalEvent)
        }
      }
    }]
  ]
}
 */