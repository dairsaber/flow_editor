/**
 * 导出指定的Json数据
 * @param {Json} data 下载的数据
 * @param {String} filename 文件名称
 */
export function saveJSON(data, filename) {
  if (!data) {
    alert('保存的数据为空')
    return
  }
  if (!filename) filename = 'json.json'
  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4)
  }
  var blob = new Blob([data], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click')
  a.dispatchEvent(e)
}

/**
 * 读取json
 */
export async function readJson() {
  try {
    const fileString = await readFile('.json')
    return JSON.parse(fileString)
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * 读取本地文件
 */
export function readFile(accept) {
  return new Promise(r => {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    if (accept) {
      fileInput.setAttribute('accept', accept)
    }
    const clickEvt = document.createEvent('MouseEvents')
    clickEvt.initMouseEvent('click')
    fileInput.onchange = ({ target }) => {
      const fr = new FileReader()
      fr.onloadend = () => {
        r(fr.result)
      }
      fr.readAsText(target.files[0])
    }
    fileInput.dispatchEvent(clickEvt)
  })
}
