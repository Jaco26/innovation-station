import RecipeForm from '../../components/recipe-form.js'
import RecipeDisplay from '../../components/recipe-display.js'

export default {
  name: 'CreateRecipe',
  components: {
    RecipeForm,
    RecipeDisplay
  },
  methods: {
    ...Vuex.mapMutations('newRecipe', ['SET']),
  },
  computed: {
    title: {
      get() { return this.$store.state.newRecipe.title },
      set(val) { this.SET(['title', val]) }
    },
    description: {
      get() { return this.$store.state.newRecipe.description },
      set(val) { this.SET(['description', val]) }
    },
    markdown: {
      get() { return this.$store.state.newRecipe.markdown },
      set(val) {
        this.SET(['markdown', val.markdown])
        this.SET(['html', val.html])
      }
    },
  },
  template: //html
  `<div class="row">
    <div class="col-md-6">
      <recipe-form
        label="Add a new recipe"
        :title.sync="title"
        :description.sync="description"
        :markdown.sync="markdown"
        @submit="$store.dispatch('newRecipe/ADD_RECIPE')"
      >
        <template v-slot:actions>
          <button class="btn btn-primary" id="submit-recipe" type="submit">Submit</button>

        </template>
      </recipe-form>
    </div>
    <div class="col-md-6">
      <RecipeDisplay
        isPreview
        :recipe="$store.state.newRecipe"
      />
    </div>
  </div>`,
}

