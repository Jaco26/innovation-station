const RecipeDisplay = (function() {

  return {
    name: 'RecipeView',
    props: {
      isPreview: Boolean,
      editing: Boolean,
      recipe: Object,
    },
    template: //html
    `<div class="card">
      <div class="card-body">
        <div v-if="isPreview">
          <h6 class="card-title text-muted">Recipe Preview</h6>
        </div>
        <div class="card-text">
          <small v-if="isPreview && recipe.title" class="text-muted">(title)</small>
          <h1>{{recipe.title}}</h1>
          <small v-if="isPreview && recipe.description" class="text-muted">(description)</small>
          <p>{{recipe.description}}</p>
          <small v-if="isPreview && recipe.html" class="text-muted">(content)</small>
          <div v-html="recipe.html"></div>
        </div>
      </div>
    </div>`,
  }

})()