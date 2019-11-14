const PageRecipeSaved = {
  name: 'SavedRecipe',
  components: {
    TheRecipeForm,
    RecipeDisplay,
  },
  template: //html
  `<div class="row">
    <div class="col-md-6">
      <h1>You've previously saved this recipe:</h1>
      <TheRecipeForm 
        label="Edit this recipe"
        :title.sync="title"
        :description.sync="description"
        :markdown.sync="markdown"
        @submit="$store.dispatch('recipe/UPDATE_RECIPE')"
      />
    </div>
    <div class="col-md-6">
      <RecipeDisplay :recipe="$store.getters.selectedRecipe" />
    </div>
  </div>`,
  methods: {
    ...Vuex.mapMutations(['UPDATE_SELECTED'])
  },
  computed: {
    title: {
      get() { return this.$store.getters.selectedRecipe.title },
      set(val) { this.UPDATE_SELECTED(['title', val]) }
    },
    description: {
      get() { return this.$store.getters.selectedRecipe.description },
      set(val) { this.UPDATE_SELECTED(['description', val]) }
    },
    markdown: {
      get() { return this.$store.getters.selectedRecipe.markdown },
      set(val) {
        this.UPDATE_SELECTED(['markdown', val.markdown])
        this.UPDATE_SELECTED(['html', val.html])
      }
    },
  }
}