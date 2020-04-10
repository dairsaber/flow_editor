/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import Card from '../Card'
import { Input } from 'ant-design-vue'
// import { error } from '../../utils/tips'
import { getClassName } from '../../utils/cssNameSpace'
import { Debounce } from 'aftool'
const myDebounce = new Debounce()
export default {
  inject: ['flow'],
  props: {
    item: Object
  },
  data() {
    return { edgeData: {}, other: '', jsonError: false }
  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        if (!val) return
        this.edgeData = val.getData() || {}
        const { From, To, Name, ...other } = this.edgeData
        this.other = JSON.stringify(other || {})
      }
    }
  },
  methods: {
    handleChange(key, value) {
      // const oldValue = this.edgeData
      const { From, To, Name, ...other } = this.edgeData
      if (key === 'other') {
        this.other = value
      } else {
        this.edgeData = { ...this.edgeData, [key]: value }
      }
      myDebounce.go(() => {
        if (key === 'other') {
          let newOtherData = {}
          try {
            newOtherData = JSON.parse(value || {})
            this.jsonError = false
          } catch (error) {
            this.jsonError = true
            return
          }
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
            <div style="width:3rem;text-align:right">条件：</div>
            <Input.TextArea
              class={{ 'input-error': this.jsonError }}
              rows={10}
              value={this.other}
              onChange={({ target: { value } }) => {
                this.handleChange('other', value)
              }}
            />
          </p>
        </Card>
      </div>
    )
  }
}
