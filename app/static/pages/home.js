const PageHome = (function() {

  // define HomePage-specific comonents here

  return {
    name: 'Home',
    template: //html
    `<div>
      <h1>Recipes</h1>
      <ul style="list-style: none;">
        <li v-for="r in $store.getters.recipeList" :key="r.id">
          <router-link :to="'/recipe/' + r.id">
            {{r.title}}
          </router-link>
        </li>
      </ul>
    </div>`
  }
  
})()