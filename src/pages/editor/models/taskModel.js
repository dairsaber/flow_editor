import BaseModel from './baseModel'
import * as configTool from '../config'
import { TaskNode } from '../nodes/TaskNode'
import { createDom } from '../utils/common'
export class TaskModel extends BaseModel {
  constructor(config, data) {
    super({
      name: '任务',
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
    this.nodeInstance = new TaskNode({ model: this })
    this.currentEle = this.nodeInstance.render(createDom)
    return this.currentEle
  }
}
