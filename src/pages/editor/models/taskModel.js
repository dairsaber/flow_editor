import BaseModel from './baseModel'
import * as configTool from '../config'
import Task from '../nodes/TaskNode'
export class TaskModel extends BaseModel {
  constructor(config, data) {
    super({
      data,
      endpoints: [
        {
          anchor: { ...configTool.defaultAnchor, anchor: 'Top' },
          endpoint: configTool.defaultTargetPoint
        },
        {
          anchor: { ...configTool.defaultAnchor, anchor: 'Bottom' },
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
