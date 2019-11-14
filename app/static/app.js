

const App = (function() {


  return {
    template: //html
    `<div class="container-fluid text-primary">
      
      <nav class="navbar">
        <div class="title">
          <router-link exact to="/">Recipes</router-link>
        </div>
        <ul>
          <li>
            <router-link exact class="navlink" to="/recipe">Create</router-link>
          </li>
        </ul>
      </nav>
      <hr>
      <main class="content">
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
