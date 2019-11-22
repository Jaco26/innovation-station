import { createRecipeItem } from '../../util.js'

export default {
  namespaced: true,
  state: createRecipeItem(),
  mutations: {
    RESET(state) {
      Object.entries(createRecipeItem()).forEach(([key, val]) => {
        state[key] = val
      })
    },
    TRIM_STATE(state) {
      state.title = state.title.trim()
      state.description = state.description.trim()
      state.markdown = state.markdown.trim()
    },
    SET(state, [key, val]) {
      if (state[key] !== undefined) {
        if (key === 'title') {
          state.uniqueTitle = val.replace(/\s/g, '-').toLowerCase()
        }
        state[key] = val
      }
    },
  },
  actions: {
    async ADD_RECIPE({ commit, state }) {
      try {
        commit('TRIM_STATE')
        commit('SET_BUSY', ['add_recipe', true], { root: true })
        commit('CLEAR_MESSAGES', 'add_recipe', { root: true })
        const res = await this.$api.post('/recipe', state)
        commit('recipes/UPDATE_RECIPE_COLLECTION', { ...state, ...res.data }, { root: true })
        commit('RESET')
      } catch (error) {
        if (error.response && error.response.data.message) {
          commit('UPDATE_MESSAGES', ['add_recipe', error.response.data.message], { root: true })
        }
        commit('UPDATE_ERRORS', ['add_recipe', error.message], { root: true })
      } finally {
        commit('SET_BUSY', ['add_recipe', true], { root: true })
      }
    }
  }
}