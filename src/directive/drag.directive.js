export default {
  bind: (el, binding) => {
    el.draggable = true
    el.style.cursor = 'pointer'
    el.style.overflow = 'hidden'
    el.$dragData = binding.value
    const oldborder = el.style.border
    const oldborderRadius = el.style.borderRadius
    function dragstartHandle(e) {
      let { target } = e
      e.dataTransfer.setData('text/plain', el.$dragData)
      target.style.border = '2px dashed orange'
      target.style.borderRadius = '4px'
    }
    function dragendHandle(e) {
      let { target } = e
      target.style.border = oldborder
      target.style.borderRadius = oldborderRadius
    }
    el.addEventListener('dragstart', dragstartHandle)
    el.addEventListener('dragend', dragendHandle)
  },
  update(el, binding) {
    el.$dragData = binding.value
  }
}
