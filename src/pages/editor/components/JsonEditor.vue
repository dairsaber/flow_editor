<template>
  <div
    style="border-radius: 8px; overflow: hidden;"
  >
    <div
      :class="{ 'json-editor': true, full: true, 'active-full': activeFull }"
    >
      <div class="json-editor-container" ref="jsonEditor">
        <textarea ref="textarea" />
      </div>
      <Icon v-if="activeFull" @click="unFull" type="close" class="close" />
      <Tag v-if="activeFull" @click="format" color="blue" class="format"
        >格式化</Tag
      >
    </div>
    <div :class="{ cover: true, 'active-full': activeFull }"></div>
  </div>
</template>
<script>
import { Icon, Tag } from 'ant-design-vue'
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import { Debounce } from 'aftool'
const myDebounce = new Debounce()
require('script-loader!jsonlint')
export default {
  name: 'JsonEditor',
  components: { Icon, Tag },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否只读，默认否
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      jsonEditor: null,
      activeFull: false,
      currentValue: {}
    }
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        this.currentValue = value
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      }
    }
  },
  mounted() {
    this.initJsonEditor()
    this.jsonEditor.setOption('readOnly', this.readOnly)
  },
  methods: {
    full() {
      this.activeFull = true
    },
    unFull() {
      this.activeFull = false
    },
    format() {
      this.jsonEditor.setValue(JSON.stringify(this.currentValue, null, 2))
    },
    // 初始化jsonEditor
    initJsonEditor() {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        theme: 'dracula',
        lint: true
      })
      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      this.jsonEditor.on('change', cm => {
        this.onEmit(cm)
      })
    },

    onEmit(cm) {
      myDebounce.go(() => {
        try {
          const jsonData = JSON.parse(cm.getValue())
          this.$emit('change', jsonData)
          this.$emit('input', jsonData)
          this.currentValue = jsonData
        } catch (err) {
          //    console.log(err);
        }
      })
    },
    // 获取json
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style lang="less" scoped>
.format {
  right: 3rem;
  top: 1rem;
  position: absolute;
  z-index: 99999;
}
.close {
  font-size: 18px;
  font-weight: 600;
  color: grey;
  position: absolute;
  right: 1.5rem;
  top: 0.5rem;
  z-index: 99999;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: red;
  }
}
</style>

<style lang="less">
.active-full {
  &.full {
    // padding:1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 5px 1px #888;
    position: fixed !important;
    z-index: 100;
    height: 50vh;
    left: calc(~'50vw - 360px');
    top: 10rem;
    width: 800px !important;
    // overflow: hidden;
    .CodeMirror {
      min-height: 50vh;
    }
    .CodeMirror-scroll {
      min-height: 50vh;
    }
  }
  &.cover {
    position: fixed !important;
    background-color: rgba(0, 0, 0, 0.8);
    height: 100vh;
    width: 100vw;
    z-index: 99;
    top: 0;
    left: 0;
  }
}
.json-editor {
  height: 300px;
  position: relative;
  font-size: 14px;
  border: 1px solid #ddd;
  overflow: hidden;
  .json-editor-container {
    // overflow: auto;
    height: 100%;
    position: relative;
  }
  //   .CodeMirror {
  //     min-height: 300px;
  //     .CodeMirror-line {
  //       line-height: 1.5;
  //     }
  //   }
  //   .CodeMirror-scroll {
  //     min-height: 300px;
  //     width: 100%;
  //   }
  //   .CodeMirror-linenumber {
  //     color: #2b91af;
  //     height: 21px;
  //     line-height: 21px;
  //   }
  //   .CodeMirror-gutters {
  //     background-color: #fff;
  //     border-right: 0;
  //   }
}
</style>
