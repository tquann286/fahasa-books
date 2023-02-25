export const replaceDoubleCurly = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      replaceDoubleCurly(obj[key])
    } else {
      const value = obj[key]
      if (typeof value === 'string') {
        obj[key] = value.replace(/\{\{(.+?)\}\}/g, '{$1}')
      }
    }
  })
}
