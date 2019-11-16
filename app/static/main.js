import router from './router.js'
import store from './store/store.js'
import App from './app.js'

import { recursivelyCasify, snakeCasify, camelCaseify } from './util.js'

const $api = axios.create({
  baseURL: '/api',
})


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
