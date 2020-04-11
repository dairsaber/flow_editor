/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import Card from '../Card'
import { Tag, Input } from 'ant-design-vue'
import { error } from '../../utils/tips'
import { getClassName } from '../../utils/cssNameSpace'
import { Debounce } from 'aftool'
import JsonEditor from '../JsonEditor'
const myDebounce = new Debounce()
export default {
  inject: ['flow'],
  props: {
    item: Object
  },
  data() {
    return { meta: {}, other: {} }
  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        this.meta = val.data.meta || {}
        const { Name, Id, Type, ...other } = this.meta
        this.other = other || {}
      }
    }
  },
  methods: {
    handleChange(key, value) {
      const oldValue = this.meta
      const { Name, Id, Type, ...other } = this.meta
      if (key !== 'other') {
        this.meta = { ...this.meta, [key]: value }
      }
      myDebounce.go(() => {
        if (key === 'Id') {
          const isExist = this.flow.models.some(x => x.id === value)
          if (isExist) {
            error('此Id与别的节点Id有冲突')
            this.meta = oldValue
            return
          }
        } else if (key === 'other') {
          let newOtherData = value || {}
          const originKeys = Object.keys(other)
          const newKeys = Object.keys(newOtherData)
          const allKeys = [...new Set(originKeys.concat(newKeys))]
          const newValues = allKeys.reduce((prev, current) => {
            const currentValue = newOtherData[current]
            if (currentValue !== undefined) {
              return { ...prev, [current]: newOtherData[current] }
            } else {
              delete this.meta[current]
              return prev
            }
          }, {})
          this.meta = { ...this.meta, ...newValues }
        }
        this.item.updateMeta(this.meta)
      })
    },
    fullJsonEditor() {
      this.$refs['jsonEditor'].full()
    }
  },
  render() {
    const item = this.item
    const { Name, Id } = this.meta
    return (
      <div class={getClassName('basic-pannel')}>
        <Card title="节点基本属性">
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
        <Card title="元数据">
          <p style="display:flex;">
            <div style="width:3rem;text-align:right">Name：</div>
            <div style="flex:1">
              <Input
                size="small"
                value={Name}
                onChange={({ target: { value } }) => {
                  this.handleChange('Name', value)
                }}
              />
            </div>
          </p>
          <p style="display:flex;">
            <div style="width:3rem;text-align:right">ID：</div>
            <div style="flex:1">
              <Input
                size="small"
                value={Id}
                onChange={({ target: { value } }) => {
                  this.handleChange('Id', value)
                }}
              />
            </div>
          </p>
          <p>
            <div style="display:flex">
              <div style="width:3rem;text-align:right">其他：</div>
              <Tag
                style="float:right"
                onClick={this.fullJsonEditor}
                color="blue"
              >
                全屏编辑
              </Tag>
            </div>
          </p>
          <p>
            <JsonEditor
              ref="jsonEditor"
              value={this.other}
              onChange={value => {
                this.handleChange('other', value)
              }}
            />
          </p>
        </Card>
      </div>
    )
  }
}
