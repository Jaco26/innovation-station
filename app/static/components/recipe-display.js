

export default {
  name: 'RecipeDisplay',
  props: {
    isPreview: Boolean,
    editing: Boolean,
    recipe: Object,
  },
  template: //html
  `<div class="card">
    <div class="card-body">
      <div class="btn-toolbar">
        <div v-if="isPreview">
          <h6 class="card-title text-muted">Recipe Preview</h6>
        </div>
        <div v-else class="d-flex flex-grow-1 justify-content-between">
          <div>
            <j-btn outline size="sm" color="info" @click="$emit('toggleEdit')">Edit &#9998;</j-btn>
            <j-btn outline size="sm" color="dark" @click="onCopy">Copy to clipboard &#8629;</j-btn>
          </div>
          <div>
            <j-btn outline size="sm" color="danger" @click="onDelete">Delete &#9888;</j-btn>
          </div>
        </div>
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
  methods: {
    async onDelete() {
      if (confirm(`Are you sure you want to delete "${this.recipe.title}"? This action cannot be undone.`)) {
        await this.$store.dispatch('editableRecipe/DELETE_RECIPE')
        if (!this.$store.state.messages.delete_recipe.length) {
          this.$router.push('/')
        }
      }
    },
    onCopy() {
      let content = this.recipe.html
      content = content.replace(/<li>(.*?)<\/li>/g, (liMatch, liContent) => `• ${liContent}\n`)
      content = content.replace(/<\/?.*>/g, '')

      const ta = document.createElement('textarea')
      ta.value = content
      ta.setAttribute('readonly', '') // make tamper-resistant (ok sure...)

      ta.style.position = 'absolute' // position texarea offscreen (even though it will likely be removed too fast to see it anyway...)
      ta.style.left = '-9999px' 
      
      document.body.appendChild(ta)

      const prevSelected = document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0) // cache preciously selected text if there is any
        : false

      ta.select()

      document.execCommand('copy') // this only copies the value of the textarea (don't know why...)
      document.body.removeChild(ta)

      if (prevSelected) { // reselect previoulsy selected range
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(prevSelected)
      }

    },
  }
}


// <button class="btn" :class="editing ? 'btn-primary' : 'btn-light'" @click="$emit('toggleEdit')">{{ editing ? 'Save Edits' : 'edit'}}</button>