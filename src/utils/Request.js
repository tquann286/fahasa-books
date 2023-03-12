import { stringify } from 'query-string'

export function buildURL(url, query) {
  let _url = url
  if (query) {
    _url += /\?/.test(url) ? '&' : '?'
    if (typeof query === 'object') {
      _url += stringify(query)
    } else {
      _url += query
    }
  }
  return _url
}
