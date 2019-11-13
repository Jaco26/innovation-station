const PageHome = (function() {

  // define HomePage-specific comonents here

  


  return {
    name: 'Home',
    data: () => ({
      recipes: [
        {
          id: 1,
          text: 'Yummm'
        },
        {
          id: 2,
          text: 'Delicious'
        },
      ]
    }),
    template: //html
    `<div>
      <h1>Recipes</h1>
      <ul style="list-style: none;">
        <li v-for="r in recipes" :key="r.id">
          <router-link :to="'/recipe/' + r.id">
            {{r.text}}
          </router-link>
        </li>
      </ul>
    </div>`
  }
  
})()