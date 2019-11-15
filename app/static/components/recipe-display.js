

export default {
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
      <div v-else>
        <button class="btn btn-light" @click="onCopy">Copy to clipboard</button>
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
    onCopy() {
      let content = this.recipe.html
      content = content.replace(/<li>(.*?)<\/li>/g, (li, liContent) => `• ${liContent}\n`)
      content = content.replace(/<\/?.*>/g, '')

      
      const ta = document.createElement('textarea')
      ta.value = content
      ta.setAttribute('readonly', '') // make tamper-resistant

      ta.style.position = 'absolute' // position texarea offscreen (even though it will likely be removed too fast to see it anyway...)
      ta.style.left = '-9999px' 
      
      document.body.appendChild(ta)

      const prevSelected = document.getSelection().rangeCount > 0 // cache preciously selected text if there is any
        ? document.getSelection().getRangeAt(0)
        : false

      ta.select()

      document.execCommand('copy') // this only copies the value of the textarea (don't know why...)
      document.body.removeChild(ta)

      if (prevSelected) { // reselect previoulsy selected ranges
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(prevSelected)
      }

    },
  }
}
