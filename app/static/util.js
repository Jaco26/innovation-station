export function createRecipeItem() {
  return {
    id: '',
    dateCreated: '',
    dateUpdated: '',
    title: '',
    uniqueTitle: '',
    description: '',
    markdown: '',
    html: '',
    tags: [],
  }
}

export function encodeQueryString(data) {
  return '?' + Object.keys(recursivelyCasify(data, {}, snakeCasify))
    .filter(key => !!data[key])
    .map(key => `${key}=${data[key]}`)
    .join('&')
}

export function snakeCasify(key) {
  return key.replace(/[A-Z]/g, match => '_' + match.toLowerCase())
}

export function camelCaseify(key) {
  return key.replace(/_\w{1}/g, (match, i, str) => str[i + 1].toUpperCase())
}

export function recursivelyCasify(obj, accum, casifier) {
  Object.keys(obj).forEach(key => {
    const val = obj[key]
    if (Array.isArray(val)) {
      // assuming no directly nested lists/arrays and all list/array items 
      // will be dicts/objects
      accum[casifier(key)] = val.map(x => recursivelyCasify(x, {}, casifier))
    } else if (val && typeof val === 'object') {
      accum[casifier(key)] = recursivelyCasify(val, {}, casifier)
    } else {
      accum[casifier(key)] = obj[key]
    }
  })
  return accum
} 