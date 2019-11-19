import { createRecipeItem } from '../../util.js'

export default {
  namespaced: true,
  state: createRecipeItem(),
  mutations: {
    SET(state, [key, val]) {
      if (state[key] !== undefined) {
        if (key === 'title') {
          state.uniqueTitle = val.replace(/\s/g, '-').toLowerCase()
        }
        state[key] = val
      }
    },
    TRIM_STATE(state) {
      state.title = state.title.trim()
      state.description = state.description.trim()
      state.markdown = state.markdown.trim()
    },
    HYDRATE(state, recipe) {
      Object.entries(recipe).forEach(([key, val]) => {
        if (state[key] !== undefined) {
          state[key] = val
        }
      })
    }
  },
  actions: {
    async UPDATE_RECIPE({ commit, state }) {
      try {
        commit('TRIM_STATE')
        commit('SET_BUSY', ['update_recipe', true], { root: true })
        commit('CLEAR_MESSAGES', 'update_recipe', { root: true })
        await this.$api.put(`/recipe/${state.id}`, state)
        commit('recipes/UPDATE_RECIPE_COLLECTION', { ...state }, { root: true })
        commit('SET_SUCCESS', 'update_recipe', { root: true })
      } catch (error) {
        if (error.response && error.response.data.message) {
          commit('UPDATE_MESSAGES', ['update_recipe', error.response.data.message], { root: true })
        }
        commit('UPDATE_ERRORS', ['update_recipe', error.message], { root: true })
      } finally {
        commit('SET_BUSY', ['update_recipe', false], { root: true })

      }
    }
  }
}

async function delay(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}