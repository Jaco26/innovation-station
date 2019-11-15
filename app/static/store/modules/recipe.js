
import { createRecipeItem, createRecipeState } from '../util.js'

export default {
  namespaced: true,
  state: createRecipeState(),
  mutations: {
    RESET(state) {
      Object.entries(createRecipeState()).forEach(([key, val]) => {
        state[key] = val
      })
    },
    SET(state, [key, val]) {
      if (state[key] !== undefined) {
        state[key] = val
      }
    },
    SET_RECIPE(state, [key, val]) {
      if (state.item[key] !== undefined) {
        state.item[key] = val
      }
    }
  },
  actions: {
    async ADD_RECIPE({ commit, dispatch, state, rootState }) {
      try {
        commit('SET', ['busy', true])
        commit('SET', ['messages', []])
        const res = await this.$api.post('/recipe', state.item)
        commit('UPDATE_RECIPE_COLLECTION', { ...state.item, id: res.data }, { root: true })
        commit('SET', ['messages', res.messages])
        commit('RESET')
      } catch (error) {
        commit('SET', ['errors', [...state.errors, error.message]])
      } finally {
        commit('SET', ['busy', false])
      }
    },
    async UPDATE_RECIPE({ commit, state, rootState, rootGetters }) {
      try {
        commit('SET', ['busy', true])
        commit('SET', ['messages', []])
        const res = await this.$api.put(`recipe/${rootState.selectedId}`, rootGetters.selectedRecipe)
        commit('SET', ['messages', res.messages])
      } catch (error) {
        commit('SET', ['errors', [...state.errors, error.message]])
      } finally {
        commit('SET', ['busy', false])
      }
    },
    async DELETE_RECIPE({ commit, state, rootState }) {
      try {
        commit('SET', ['busy', true])
        commit('SET', ['messages', []])
        const res = await this.$api.delete(`recipe/${rootState.selectedId}`)
        commit('SET', ['messages', res.messages])
      } catch (error) {
        commit('SET', ['errors', [...state.errors, error.message]])
      } finally {
        commit('SET', ['busy', false])
      }
    },
  }
}