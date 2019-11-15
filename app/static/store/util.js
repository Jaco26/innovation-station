export function createRecipeItem() {
  return {
    id: '',
    title: '',
    uniqueTitle: '',
    description: '',
    markdown: '',
    html: '',
    tags: [],
  }
}

export function createRecipeState() {
  return {
    busy: false,
    errors: [],
    messages: [],
    item: createRecipeItem()
  }
}

export function encodeQueryString(data) {
  return '?' + Object.keys(data)
    .filter(key => !!data[key])
    .map(key => `${key}=${data[key]}`)
    .join('&')
}