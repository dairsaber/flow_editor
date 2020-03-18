import Node from './baseModel'
import * as configTool from '../config'
import Task from '../nodes/TaskNode'
export class TaskNode extends Node {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          id: 'Left',
          anchor: { ...configTool.defaultAnchor, anchor: 'Left' },
          endpoint: configTool.defaultTargetPoint
        },
        {
          id: 'Right',
          anchor: { ...configTool.defaultAnchor, anchor: 'Right' },
          endpoint: configTool.defaultSourceEndpoint
        }
      ],
      type: 'task',
      ...(config || {})
    })
  }
  render() {
    return this.$createElement(Task, { props: { config: this } })
  }
}
