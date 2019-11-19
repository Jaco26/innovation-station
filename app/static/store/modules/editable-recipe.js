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
    async UPDATE_RECIPE({ commit, state, rootGetters }) {
      try {
        commit('TRIM_STATE')
        commit('SET_BUSY', ['update_recipe', true], { root: true })
        const res = await this.$api.put(`/recipe/${state.id}`, state)
        commit('UPDATE_MESSAGES', ['update_recipe', res.messages], { root: true })
        commit('recipes/UPDATE_RECIPE_COLLECTION', { ...state }, { root: true }) // TODO, need to refactor res.messages to be catches
      } catch (error) {
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