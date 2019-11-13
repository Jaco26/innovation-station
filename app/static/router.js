
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome
    },
    {
      path: '/recipe',
      component: PageRecipeContainer,
      children: [
        {
          path: '',
          name: 'new-recipe',
          component: PageRecipeNew
        },
        {
          path: ':id',
          name: 'saved-recipe',
          component: PageRecipeSaved
        }
      ]
    },
  ]
})

