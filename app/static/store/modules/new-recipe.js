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
    SET(state, [key, val]) {
      if (state[key] !== undefined) {
        state[key] = val
      }
    },
  },
  actions: {
    async ADD_RECIPE({ commit, state }) {
      try {
        commit('SET_BUSY', ['add_recipe', true], { root: true })
        const res = await this.$api.post('/recipe', state)
        commit('recipes/UPDATE_RECIPE_COLLECTION', { ...state, id: res.data }, { root: true })
        commit('UPDATE_MESSAGES', ['add_recipe', res.messages], { root: true })
      } catch (error) {
        commit('UPDATE_ERRORS', ['add_recipe', error.message], { root: true })
      } finally {
        commit('SET_BUSY', ['add_recipe', true], { root: true })
      }
    }
  }
}