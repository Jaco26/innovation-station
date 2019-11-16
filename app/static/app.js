
const AppNavbar = {
  template: //html
  `<nav class="navbar">
    <div class="navbar-brand">
      <router-link class="nav-item" exact to="/">Recipes</router-link>
    </div>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link exact to="/recipe">Create</router-link>
      </li>
    </ul>
  </nav>`
}

export default {
  components: {
    AppNavbar
  },
  template: //html
  `<div>
    <AppNavbar />
    <main class="container-fluid">
      <router-view></router-view>
    </main>
  </div>`,
  mounted() {
    this.$store.dispatch('recipes/FETCH_RECIPES')
    this.$store.watch((s, g) => g['recipes/selected'],
      selectedRecipe => {
        this.$store.commit('editableRecipe/HYDRATE', selectedRecipe)
      }
    )
  },
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.$store.commit('recipes/SET', ['selectedRecipeId', newVal.params.id || null])
      }
    },
  },
}