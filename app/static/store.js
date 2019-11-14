
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
          await this.$api.post('/recipe', state.item)
          commit('SET', ['recipeList', [...rootState.recipeList, state.item]], { root: true })
          commit('RESET')
        } catch (error) {
          commit('SET', ['errors', [...state.errors, error.message]])
        } finally {
          commit('SET', ['busy', false])
        }
      },
      async UPDATE_RECIPE({ commit, rootState, rootGetters }) {
        try {
          commit('SET', ['busy', true])
          await this.$api.put(`recipe/${rootState.selectedId}`, rootGetters.selectedRecipe)
        } catch (error) {
          commit('SET', ['errors', [...state.errors, error.message]])
        } finally {
          commit('SET', ['busy', false])
        }
      },
      async DELETE_RECIPE() {
        try {
          commit('SET', ['busy', true])
          await this.$api.delete(`recipe/${rootState.selectedId}`)
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
      busy: false,
      recipeList: [],
      selectedId: '',
    },
    mutations: {
      SET(state, [key, val]) {
        if (state[key] !== undefined) {
          state[key] = val
        }
      },
      UPDATE_SELECTED(state, [key, val]) {
        const selected = state.recipeList.find(r => r.id === state.selectedId)
        if (selected) {
          selected[key] = val
        }
      }
    },
    actions: {
      async FETCH_RECIPES({ commit, state, dispatch }, { cursor, limit }) {
        try {
          commit('SET', ['busy', true])
          const query = util.encodeQueryString({ cursor, limit })
          const res = await this.$api.get('/recipes' + query)
          commit('SET', ['recipeList', [...state.recipeList, ...res.data]])
        } catch (error) {
          commit('SET', ['errors', [...state.errors, error.message]])
        } finally {
          commit('SET', ['busy', false])
        }
      }
    },
    getters: {
      selectedRecipe(state) {
        let rv = createRecipeItemState()
        const selected = state.recipeList.find(r => r.id === state.selectedId)
        if (selected) {
          rv = selected
        }
        return rv
      }
    }
  })
})()


