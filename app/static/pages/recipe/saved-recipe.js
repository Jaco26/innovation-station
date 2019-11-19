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
      editing: false,
      submitSuccess: false,
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
    async onSubmit() {
      await this.$store.dispatch('editableRecipe/UPDATE_RECIPE')
      if (!this.$store.state.messages.update_recipe.length) {
        this.submitSuccess = true
      }
    },
    onCancel() {
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

    <j-toast :closeAfter="1500" :show.sync="submitSuccess">
      <div class="d-flex flex-grow-1 justify-content-center">
        Success
      </div>
    </j-toast>

    <div :class="{ 'col-md-6' : editing }">
      <recipe-form
        v-if="editing"
        label="Edit this recipe"
        :messages="$store.state.messages.update_recipe"
        :title.sync="title"
        :description.sync="description"
        :markdown.sync="markdown"
        @submit="onSubmit"
      >
        <template v-slot:actions="{ dirty }">
          <j-btn kind="light" @click="onCancel">Cancel</j-btn>
          <j-btn :disabled="!dirty" class="ml-2" type="submit" :busy="$store.state.busy.update_recipe">Save</j-btn>
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