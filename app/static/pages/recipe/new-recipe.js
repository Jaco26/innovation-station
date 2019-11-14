const PageRecipeNew = {
  name: 'NewRecipe',
  components: {
    TheRecipeForm
  },
  template: //html
  `<div class="row">
    <div class="col-md-6">
      <TheRecipeForm label="Add a new recipe" action="ADD_RECIPE" />
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Preview</h4>
          <p class="card-subtitle mb-2 text-muted caption">This is what your recipe will look like</p>
          <hr>
          <div class="card-text">
            <small v-if="recipe.title" class="text-muted">(title)</small>
            <h1>{{recipe.title}}</h1>
            <small v-if="recipe.description" class="text-muted">(description)</small>
            <p>{{recipe.description}}</p>
            <small v-if="recipe.html" class="text-muted">(content)</small>
            <div v-html="recipe.html"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  computed: {
    recipe() {
      return this.$store.state.recipe.item
    }
  }
}

