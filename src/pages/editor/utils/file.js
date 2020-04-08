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
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  )
  a.dispatchEvent(e)
}

/**
 * 读取json
 */
export async function readJson() {
  try {
    const fileString = await readFile()
    return JSON.parse(fileString)
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * 读取本地文件
 */
export function readFile(accept = '.json') {
  return new Promise(r => {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', accept)
    const clickEvt = document.createEvent('MouseEvents')
    clickEvt.initMouseEvent(
      'click',
      false,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    )
    fileInput.onchange = ({ target }) => {
      // const fileName = fileInput.getAttribute('value')
      console.log(target.files)
      const fr = new FileReader()
      // eslint-disable-next-line no-debugger
      fr.onloadend = () => {
        r(fr.result)
      }
      fr.readAsText(target.files[0])
    }
    fileInput.dispatchEvent(clickEvt)
  })

  // let fr = new FileReader()
  // return new Promise(
  //   r => {
  //     fr.onloadend(() => {
  //       r(fr.result)
  //     })
  //     fr.readAsText()
  //   },
  //   reason => {
  //     reason('读取失败')
  //   }
  // )
}
