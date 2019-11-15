import RecipeForm from '../../components/recipe-form.js'
import RecipeDisplay from '../../components/recipe-display.js'

export default {
  name: 'CreateRecipe',
  components: {
    RecipeForm,
    RecipeDisplay
  },
  template: //html
  `<div class="row">
    <div class="col-md-6">
      <RecipeForm
        label="Add a new recipe"
        :title.sync="title"
        :description.sync="description"
        :markdown.sync="markdown"
        @submit="$store.dispatch('recipe/ADD_RECIPE')"
      />
    </div>
    <div class="col-md-6">
      <RecipeDisplay
        isPreview
        :recipe="$store.state.recipe.item"
      />
    </div>
  </div>`,
  methods: {
    ...Vuex.mapMutations('recipe', ['SET_RECIPE']),
  },
  computed: {
    title: {
      get() { return this.$store.state.recipe.item.title },
      set(val) { this.SET_RECIPE(['title', val]) }
    },
    description: {
      get() { return this.$store.state.recipe.item.description },
      set(val) { this.SET_RECIPE(['description', val]) }
    },
    markdown: {
      get() { return this.$store.state.recipe.item.markdown },
      set(val) {
        this.SET_RECIPE(['markdown', val.markdown])
        this.SET_RECIPE(['html', val.html])
      }
    },
  },
}

