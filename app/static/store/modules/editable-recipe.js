import { createRecipeItem } from '/static/util.js'

export default {
  namespaced: true,
  state: createRecipeItem(),
  mutations: {
    SET(state, [key, val]) {
      if (state[key] !== undefined) {
        state[key] = val
      }
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
      console.log('updating recipe', { ...state })
      try {
        commit('SET_BUSY', ['update_recipe', true], { root: true })
        const res = await this.$api.put(`/recipe/${state.id}`, state)
        commit('UPDATE_MESSAGES', ['update_recipe', res.messages], { root: true })
      } catch (error) {
        commit('UPDATE_ERRORS', ['update_recipe', error.message], { root: true })
      } finally {
        commit('SET_BUSY', ['update_recipe', false], { root: true })
      }
    }
  }
}