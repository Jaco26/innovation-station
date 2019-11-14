
const store = (function() {

  const util = {
    encodeQueryString(data) {
      return '?' + Object.keys(data)
        .filter(key => !!data[key])
        .map(key => `${key}=${data[key]}`)
        .join('&')
    }
  }

  function createRecipeItemState() {
    return {
      id: '',
      title: '',
      description: '',
      markdown: '',
      html: '',
      tags: [],
    }
  }

  function createRecipeState() {
    return {
      busy: false,
      errors: [],
      messages: [],
      item: createRecipeItemState()
    }
  }


  const recipe = {
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
   
  

  return new Vuex.Store({
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
        // const selected = state.recipeList.find(r => r.id === state.selectedId)
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
          const query = util.encodeQueryString({ cursor, limit })
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
        let rv = createRecipeItemState()
        // const selected = state.recipeList.find(r => r.id === state.selectedId)
        const selected = state.recipes[state.selectedId]
        if (selected) {
          rv = selected
        }
        return rv
      }
    }
  })
})()


