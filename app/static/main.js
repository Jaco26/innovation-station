import router from './router.js'
import store from './store/store.js'
import App from './app.js'

const $api = axios.create({
  baseURL: '/api',
})


function snakeCasify(key) {
  return key.replace(/[A-Z]/g, match => '_' + match.toLowerCase())
}

function camelCaseify(key) {
  return key.replace(/_\w{1}/g, (match, i, str) => str[i + 1].toUpperCase())
}

function recursivelyCasify(obj, accum, casifier) {
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


$api.interceptors.response.use(res => {
  if (res.data) {
    if (Array.isArray(res.data.data)) {
      res.data.data = res.data.data.map(x => recursivelyCasify(x, {}, camelCaseify))
    } else if (res.data.data && typeof res.data.data === 'object') {
      res.data.data = recursivelyCasify(res.data.data, {}, camelCaseify)
    }
  }
  return res.data
})

$api.interceptors.request.use(req => {
  if (req.data) {
    req.data = recursivelyCasify(req.data, {}, snakeCasify)
  }
  return req
})

store.$api = $api

Vue.prototype.$api = $api

const app = new Vue({
  router,
  store,
  components: { App },
  render: function(h) {
    return h('App')
  },
})

app.$mount('#app')
