
export default {
  namespaced: true,
  state: {
    newTagName: '',
    list: []
  },
  mutations: {
    SET(state, [key, val]) {
      if (state[key] !== undefined) {
        state[key] = val
      }
    }
  },
  actions: {
    async FETCH_TAGS({ commit }) {
      try {
        commit('SET_BUSY', ['fetch_tags', true], { root: true })
        const res = await this.$api.get('/tags')
        commit('SET', ['list', res.data])
      } catch (error) {
        if (error.response && error.response.data.message) {
          commit('UPDATE_MESSAGES', ['fetch_tags', error.response.data.message], { root: true })
        }
        commit('UPDATE_ERRORS', ['fetch_tags', error.message], { root: true })
      } finally {
        commit('SET_BUSY', ['fetch_tags', false], { root: true })
      }
    },
    async ADD_TAG({ commit, dispatch, state }) {
      try {
        commit('SET_BUSY', ['add_tag', true], { root: true })
        await this.$api.post('/tag', { name: state.newTagName })
        commit('SET', ['newTagName', ''])
        dispatch('FETCH_TAGS')
      } catch (error) {
        if (error.response && error.response.data.message) {
          commit('UPDATE_MESSAGES', ['add_tag', error.response.data.message], { root: true })
        }
        commit('UPDATE_ERRORS', ['add_tag', error.message], { root: true })
      } finally {
        commit('SET_BUSY', ['add_tag', false], { root: true })
      }
    }
  }
}