import { createRecipeItem, encodeQueryString } from '../../util.js'

export default {
  namespaced: true,
  state: {
    indexedById: {},
    selectedRecipeId: '',
    query: {
      limit: 0,
      cursor: '',
    },
    sortOrder: 'desc',
    sortOrderOptions: [
      'desc',
      'asc',
    ],
    sortBy: '',
    sortByOptions: [
      'recent',
      'alphabetically',
    ]
  },
  mutations: {
    SET(state, [key, val]) {
      if (state[key] !== undefined) {
        state[key] = val
      }
    },
    UPDATE_RECIPE_COLLECTION(state, recipe) {
      if (Array.isArray(recipe)) {
        state.indexedById = recipe.reduce((acc, r) => ({ ...acc, [r.id]: r }), {})
      } else {
        state.indexedById = { ...state.indexedById, [recipe.id]: recipe }
      }
    },
  },
  actions: {
    async FETCH_RECIPES({ commit, state }) {
      try {
        commit('SET_BUSY', ['fetch_recipes', true], { root: true })
        const res = await this.$api.get('/recipes')
        commit('UPDATE_RECIPE_COLLECTION', res.data)
      } catch (error) {
        if (error.response && error.response.data.message) {
          commit('UPDATE_MESSAGES', ['fetch_recipes', error.response.data.message], { root: true })
        }
        commit('UPDATE_ERRORS', ['fetch_recipes', error.message], { root: true })
      } finally {
        commit('SET_BUSY', ['fetch_recipes', false], { root: true })
      }
    },
    async FETCH_RECIPE_BY_ID({ commit }, recipeId) {
      try {
        
      } catch (error) {
        
      } finally {

      }
    }
  },
  getters: {
    list(state) {
      if (!state.sortBy) {
        return Object.values(state.indexedById)
      }
      return ['SORTING', 'NOT', 'IMPLMENTED', 'YET', '!', '!', '!']
    },
    selected(state) {
      let rv = createRecipeItem()
      const selected = state.indexedById[state.selectedRecipeId]
      if (selected) {
        console.log('new selected')
        rv = selected
      }
      return rv
    },
  }
}