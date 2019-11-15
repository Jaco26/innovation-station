import RecipeForm from '/static/components/recipe-form.js'
import RecipeDisplay from '/static/components/recipe-display.js'

export default {
  name: 'SavedRecipe',
  components: {
    RecipeForm,
    RecipeDisplay,
  },
  template: //html
  `<div class="row">
    <div :class="{ 'col-md-6' : editing }">
      <RecipeForm
        v-if="editing"
        label="Edit this recipe"
        actionText="Save Edits"
        :title.sync="title"
        :description.sync="description"
        :markdown.sync="markdown"
        @submit="$store.dispatch('recipe/UPDATE_RECIPE')"
      />
    </div>
    <div class="col" :class="{ 'col-md-6' : editing }">
      <button class="btn" :class="editing ? 'btn-primary' : 'btn-light'" @click="toggleEdit">{{ editing ? 'Save Edits' : 'edit'}}</button>
      <RecipeDisplay :recipe="$store.getters.selectedRecipe" />
    </div>
  </div>`,
  data() {
    return {
      editing: false
    }
  },
  methods: {
    ...Vuex.mapMutations(['UPDATE_SELECTED']),
    async toggleEdit() {
      if (this.editing) {
        await this.$store.dispatch('recipe/UPDATE_RECIPE')
        this.$nextTick(() => {
          if (!this.$store.state.recipe.messages.length) {
            console.log(this.$store.state.recipe.messages)
            this.editing = false
          }
        })
      } else {
        this.editing = true
      }
    }
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
  },
}