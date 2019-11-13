

const App = (function() {


  return {
    template: //html
    `<div>
      <nav>
        <span>
          <h1>This is the recipe tracker</h1>
        </span>
        <span>
          <router-link to="/">Home</router-link>
          <router-link to="/recipe">New Recipe</router-link>
        </span>
      </nav>
      <router-view></router-view>
    </div>`,
    mounted() {
      this.$store.dispatch('FETCH_RECIPES', {
        cursor: 'hi',
        limit: 10,
      })
    },
  }

})()

