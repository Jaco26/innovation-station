import recipe from './modules/recipe.js'
import { encodeQueryString, createRecipeItem } from './util.js'

export default new Vuex.Store({
  modules: {
    recipe,
  },
  state: {
    errors: [],
    messages: [],
    busy: false,
    recipes: {},
    selectedId: '',
  },
  mutations: {
    SET(state, [key, val]) {
      if (state[key] !== undefined) {
        state[key] = val
      }
    },
    UPDATE_SELECTED(state, [key, val]) {
      const selected = state.recipes[state.selectedId]
      if (selected) {
        selected[key] = val
      }
    },
    UPDATE_RECIPE_COLLECTION(state, recipe) {
      if (Array.isArray(recipe)) {
        state.recipes = recipe.reduce((acc, r) => ({ ...acc, [r.id]: r }), {})
      } else {
        state.recipes = { ...state.recipes, [recipe.id]: recipe }
      }
    },
  },
  actions: {
    async FETCH_RECIPES({ commit, state, dispatch }, { cursor, limit }) {
      try {
        commit('SET', ['busy', true])
        commit('SET', ['messages', []])
        const query = encodeQueryString({ cursor, limit })
        const res = await this.$api.get('/recipes' + query)
        commit('UPDATE_RECIPE_COLLECTION', res.data)
        commit('SET', ['messages', res.messages])
      } catch (error) {
        commit('SET', ['errors', [...state.errors, error.message]])
      } finally {
        commit('SET', ['busy', false])
      }
    }
  },
  getters: {
    recipeList(state) {
      return Object.values(state.recipes)
    },
    selectedRecipe(state) {
      let rv = createRecipeItem()
      // const selected = state.recipeList.find(r => r.id === state.selectedId)
      const selected = state.recipes[state.selectedId]
      if (selected) {
        rv = selected
      }
      return rv
    }
  }
})