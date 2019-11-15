
import HomePage from './pages/home.js'
import RecipePageContainer from './pages/recipe.js'
import CreateRecipePage from './pages/recipe/create-recipe.js'
import SavedRecipePage from './pages/recipe/saved-recipe.js'


export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/recipe',
      component: RecipePageContainer,
      children: [
        {
          path: '',
          name: 'create-recipe',
          component: CreateRecipePage
        },
        {
          path: ':id',
          name: 'saved-recipe',
          component: SavedRecipePage
        }
      ]
    },
  ]
})

