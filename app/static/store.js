
const store = (function() {

  const util = {
    encodeQueryString(data) {
      return '?' + Object.keys(data)
        .filter(key => !!data[key])
        .map(key => `${key}=${data[key]}`)
        .join('&')
    }
  }


  const recipe = {
    namespaced: true,
    state: {
      busy: false,
      errors: [],
      item: {
        id: '',
        title: '',
        description: '',
        markdown: '',
        html: '',
        tags: [],
      }
    },
    mutations: {
      RESET(state) {
        state.busy = false;
        state.errors = []
        state.item = {
          id: '',
          title: '',
          description: '',
          markdown: '',
          html: '',
          tags: [],
        }
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
      async UPDATE_RECIPE() {
        try {
          
        } catch (error) {
          
        } finally {

        }
      },
      async DELETE_RECIPE() {
        try {
          
        } catch (error) {
          
        } finally {

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
      selectedId: null,
    },
    mutations: {
      SET(state, [key, val]) {
        if (state[key] !== undefined) {
          state[key] = val
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
    }
  })
})()


