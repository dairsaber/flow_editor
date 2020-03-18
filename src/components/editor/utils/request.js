import axios from 'axios'
// import qs from 'qs'
// import jsonp from 'jsonp'
const header = {
  Authorization: ' AUTH_TOKEN',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  chartset: 'uft-8'
}

export function request(urlstr, data) {
  let splits = urlstr.split(' ')
  let url,
    method = 'get'
  if (splits.length === 1) {
    url = urlstr
  } else if (splits.length === 2) {
    url = splits[1]
    method = splits[0]
  }
  return axios({
    header,
    method,
    url,
    ...data
  })
}
