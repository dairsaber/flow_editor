export default {
  bind: (el, binding) => {
    const emitData = binding.value
    function dragentertHandle(e) {
      e.preventDefault()
      let { target } = e
      if (el.contains(target)) {
        e.dataTransfer.dropEffect = 'move'
      }
    }
    function dragovertHandle(e) {
      e.preventDefault()
      let { target } = e
      if (el.contains(target)) {
        e.dataTransfer.dropEffect = 'move'
        // el.style.border = '2px dashed orange'
      }
    }
    // function dragleaveHandle() {
    //   el.style.border = ''
    // }
    function dropHandle(e) {
      e.preventDefault()
      if (el.contains(e.target)) {
        const data = e.dataTransfer.getData('text')
        el.style.border = ''
        emitData(data, e)
      }
    }
    el.addEventListener('dragenter', dragentertHandle)
    el.addEventListener('dragover', dragovertHandle)
    // el.addEventListener('dragleave', dragleaveHandle)
    el.addEventListener('drop', dropHandle)
  }
}
