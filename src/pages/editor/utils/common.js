/**
 * 唯一标识生成器
 * @param {String} c 种子
 */
export function guid(c) {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  c = c || ''
  return `${s4()}${c}${s4()}${c}${s4()}${c}${s4()}${c}${s4()}${c}${s4()}${c}${s4()}${c}${s4()}`
}

/**
 * 生成dom元素
 * domData [tag,styleObject,eventsObject,children<domData>]
 * 例如['div',{backgroundColor:'red'},{click:(ele)=>{console.log(ele)}},[
 *  ['span',null,"你是蠢猪屎么？"]
 * ]]
 * tag也可以是dom元素
 */
export function createDom(tag, props, children) {
  const { style, on: event, className, attrs } = props || {}
  let currentEle
  switch (true) {
    case tag instanceof HTMLElement:
      currentEle = tag
      break
    case typeof tag === 'string' && /\//.test(tag):
      currentEle = parseDom(tag)
      break
    default:
      currentEle = document.createElement(tag)
  }
  //样式
  Object.keys(style || {}).forEach(key => {
    currentEle.style[key] = style[key]
  })
  //属性
  Object.keys(attrs || {}).forEach(key => {
    currentEle.setAttribute(key, attrs[key])
  })
  //事件
  Object.keys(event || {}).forEach(key => {
    currentEle.addEventListener(key, e => {
      event[key](currentEle, e)
    })
  })
  //类名
  if (className) {
    if (Array.isArray(className)) {
      currentEle.classList.add(...className)
    } else {
      currentEle.classList.add(className)
    }
  }
  if (typeof children === 'string') {
    currentEle.innerHTML = children
  } else if (Array.isArray(children) && children.length > 0) {
    const childrenEles = children.reduce((prev, current) => {
      const child = createDom(current)
      return [...prev, child]
    }, [])
    childrenEles.forEach(ele => {
      if (ele) {
        currentEle.appendChild(ele)
      }
    })
  } else if (children && children instanceof HTMLElement) {
    currentEle.appendChild(children)
  }
  return currentEle
}
/**
 * 将一段html字符串转换成dom
 * @param {String} arg htmlString
 */
function parseDom(arg) {
  var objE = document.createElement('div')

  objE.innerHTML = arg

  return objE.childNodes[0]
}
