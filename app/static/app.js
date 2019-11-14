

const App = (function() {

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


  return {
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
      this.$store.dispatch('FETCH_RECIPES', {
        cursor: 'hi',
        limit: 10,
      })
    },
  }

})()
