import originalJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + formatUrl(data)
  return new Promise((resolve, reject) => {
    originalJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function formatUrl(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] === undefined ? '' : data[k]
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? '' : url.substr(1)
}