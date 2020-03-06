import G6 from '@antv/g6'
import { defaultNodesConfig } from '../editor/config/index'
import { registerAddEdgeBehavior } from '../editor/utils/registerMode'
const timeNano = '202003061401'
const containerId = `testContainer_${timeNano}`
registerAddEdgeBehavior(G6) //注册添加边的mode
export default {
  data() {
    return {
      graph: null,
      initData: {
        // 点集
        nodes: [
          {
            id: 'node1', // 节点的唯一标识
            x: 100, // 节点横坐标
            y: 200, // 节点纵坐标
            label: '起始点' // 节点文本
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
            label: '目标点'
          },
          defaultNodesConfig.circle({
            id: 'test',
            label: 'ceshi',
            conf: [
              {
                label: 'conf',
                value: 'pai_graph.conf'
              },
              {
                label: 'dot',
                value: 'pai_graph.dot'
              },
              {
                label: 'init',
                value: 'init.rc'
              }
            ]
          })
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1', // 起始点 id
            target: 'node2', // 目标点 id
            label: '我是连线' // 边的文本
          }
        ]
      }
    }
  },
  mounted() {
    const width = this.$refs[containerId].offsetWidth
    const height = 700
    this.graph = new G6.Graph({
      container: containerId,
      width,
      height,
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'click-select',
          'click-add-edge',
          {
            type: 'tooltip',
            formatText(model) {
              const cfg = model.conf
              if (!cfg) return null
              const text = []
              cfg.forEach(row => {
                text.push(row.label + ':' + row.value + '<br>')
              })
              return text.join('\n')
            }
          }
        ]
      },
      fitView: true,
      animate: true
    })
    this.init()
  },
  methods: {
    init() {
      this.graph.data(this.initData)
      this.graph.render()
    }
  },
  render() {
    return <div id={containerId} ref={containerId}></div>
  }
}
