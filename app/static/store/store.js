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
    errors: {
      fetch_recipes: [],
      add_recipe: [],
      update_recipe: [],
      delete_recipe: [],
    },
    messages: {
      fetch_recipes: [],
      add_recipe: [],
      update_recipe: [],
      delete_recipe: [],
    },
    busy: {
      fetch_recipes: false,
      add_recipe: false,
      update_recipe: false,
      delete_recipe: false,
    },
  },
  mutations: {
    SET_BUSY(state, [actionName, isBusy]) {
      state.busy[actionName] = !!isBusy
    },
    UPDATE_ERRORS(state, [actionName, error]) {
      if (!state.errors[actionName]) {
        state.errors[actionName] = []
      }
      state.errors[actionName].push(error)
    },
    UPDATE_MESSAGES(state, [actionName, message]) {
      if (!state.errors[actionName]) {
        state.messages[actionName] = []
      }
      state.messages[actionName].push(message)
    },
    CLEAR_MESSAGES(state, key) {
      state.messages[key] = []
    }
  },
})