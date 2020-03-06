const defaultPoint = { x: 30, y: 30 }
export const defaultNodesConfig = {
  diamond(cfg = {}) {
    const defaultConfig = {
      type: 'diamond',
      ...defaultPoint
    }
    return { ...defaultConfig, ...cfg }
  },
  circle(cfg = {}) {
    const defaultConfig = {
      type: 'circle',
      ...defaultPoint,
      style: {
        fill: '#bae637',
        stroke: '#eaff8f',
        lineWidth: 5
      }
    }
    return { ...defaultConfig, ...cfg }
  }
}
