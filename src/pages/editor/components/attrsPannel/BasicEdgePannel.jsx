/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import Card from '../Card'
import { Tag } from 'ant-design-vue'
// import { error } from '../../utils/tips'
import { getClassName } from '../../utils/cssNameSpace'
import JsonEditor from '../JsonEditor'
import { Debounce } from 'aftool'
const myDebounce = new Debounce()
export default {
  inject: ['flow'],
  props: {
    item: Object
  },
  data() {
    return { edgeData: {}, other: {} }
  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        if (!val) return
        this.edgeData = val.getData() || {}
        const { From, To, Name, ...other } = this.edgeData
        this.other = other || {}
      }
    }
  },
  methods: {
    handleChange(key, value) {
      const { From, To, Name, ...other } = this.edgeData
      if (key !== 'other') {
        this.edgeData = { ...this.edgeData, [key]: value }
      }
      myDebounce.go(() => {
        if (key === 'other') {
          let newOtherData = value || {}
          const originKeys = Object.keys(other)
          const newKeys = Object.keys(newOtherData)
          const allKeys = [...new Set(originKeys.concat(newKeys))]
          const newValues = allKeys.reduce((prev, current) => {
            const currentValue = newOtherData[current]
            if (currentValue !== undefined) {
              return { ...prev, [current]: newOtherData[current] }
            } else {
              delete this.edgeData[current]
              return prev
            }
          }, {})
          this.edgeData = { ...this.edgeData, ...newValues }
        }
        this.item.setData(this.edgeData)
      })
    },
    fullJsonEditor() {
      this.$refs['jsonEditor'].full()
    }
  },
  render() {
    const { From, To, Name } = this.edgeData
    return (
      <div class={getClassName('basic-pannel')}>
        <Card title="边基本属性">
          <p>From：{From}</p>
          <p>To：{To}</p>
          <p>类型：{Name}</p>
        </Card>
        <Card title="元数据">
          <p>
            <div style="display:flex">
              <div style="width:3rem;text-align:right">条件：</div>
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
