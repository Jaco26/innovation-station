import recipes from './modules/recipes.js'
import newRecipe from './modules/new-recipe.js'
import editableRecipe from './modules/editable-recipe.js'

export default new Vuex.Store({
  modules: {
    recipes,
    newRecipe,
    editableRecipe,
  },
  state: {
    errors: {},
    messages: {},
    busy: {},
  },
  mutations: {
    SET_BUSY(state, [actionName, isBusy]) {
      state.busy[actionName] = isBusy
    },
    UPDATE_ERRORS(state, [actionName, error]) {
      if (!state.errors[actionName]) {
        state.errors[actionName] = []
      }
      state.errors[actionName].push(error)
    },
    UPDATE_MESSAGES(state, [actionName, messages]) {
      if (!state.errors[actionName]) {
        state.messages[actionName] = []
      }
      state.messages[actionName].push(...messages)
    }
  },
})