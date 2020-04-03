export function guid(c) {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    c = c || ''
    return `${s4()}${c}${s4()}${c}${s4()}${c}${s4()}${c}${s4()}${c}${s4()}${c}${s4()}${c}${s4()}`
  }