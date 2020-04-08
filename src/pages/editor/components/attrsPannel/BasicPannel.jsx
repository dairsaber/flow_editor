import Card from '../Card'
import { Tag } from 'ant-design-vue'
export default {
  inject: ['flow'],
  props: {
    item: Object
  },
  render() {
    // eslint-disable-next-line no-debugger
    const item = this.item
    return (
      <Card title="基本属性">
        <p> I D：{item.id}</p>
        <p>名称：{item.name}</p>
        <p>分类：{item.cat}</p>
        <p>类型：{item.type}</p>
        <p>
          位置：
          <Tag>X：{item.position[0]} PX</Tag>
          <Tag>Y：{item.position[1]} PX</Tag>
        </p>
      </Card>
    )
  }
}
