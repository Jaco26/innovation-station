import RecipeForm from '/static/components/recipe-form.js'
import RecipeDisplay from '/static/components/recipe-display.js'

export default {
  name: 'SavedRecipe',
  components: {
    RecipeForm,
    RecipeDisplay,
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    ...Vuex.mapMutations('editableRecipe', {
      edit: 'SET'
    }),
    async toggleEdit() {
      if (this.editing) {
        await this.$store.dispatch('recipe/UPDATE_RECIPE')
        this.$nextTick(() => {
          if (!this.$store.state.recipe.messages.length) {
            this.editing = false
          }
        })
      } else {
        this.editing = true
      }
    },
    cancelEdit() {
      this.editing = false
      this.$store.commit('editableRecipe/HYDRATE', this.$store.getters['recipes/selected'])
    },
  },
  computed: {
    title: {
      get() { return this.$store.state.editableRecipe.title },
      set(val) { this.edit(['title', val]) }
    },
    description: {
      get() { return this.$store.state.editableRecipe.description },
      set(val) { this.edit(['description', val]) }
    },
    markdown: {
      get() { return this.$store.state.editableRecipe.markdown },
      set(val) {
        this.edit(['markdown', val.markdown])
        this.edit(['html', val.html])
      }
    },
  },
  template: //html
  `<div class="row">
    <div :class="{ 'col-md-6' : editing }">
      <recipe-form
        v-if="editing"
        label="Edit this recipe"
        :messages="$store.state.messages.update_recipe"
        :title.sync="title"
        :description.sync="description"
        :markdown.sync="markdown"
        @submit="$store.dispatch('editableRecipe/UPDATE_RECIPE')"
      >
        <template v-slot:actions>
          <button v-if="editing" class="btn btn-light" @click="cancelEdit">Cancel</button>
          <button class="btn btn-primary" type="submit">Save Edits</button>
        </template>
      </recipe-form>
    </div>
    <div class="col" :class="{ 'col-md-6' : editing }">
      <RecipeDisplay
        :isPreview="editing"
        :editing="editing"
        :recipe="$store.state.editableRecipe"
        @toggleEdit="toggleEdit"
      />
    </div>
  </div>`,
}