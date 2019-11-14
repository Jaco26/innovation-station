const PageRecipeNew = {
  name: 'NewRecipe',
  template: //html
  `<div class="container">
    <section class="recipe">

      <form class="recipe-form" @submit.prevent="$store.dispatch('recipe/ADD_RECIPE')">
        <h3>Add a new recipe</h3>

        <fieldset class="field">
          <label for="title">Title</label>
          <input type="text" required v-model="title">

          <label for="title">Description</label>
          <input type="text" v-model="description">
        </fieldset>
        <fieldset class="field">
          <label for="content">Content</label>
          <textarea id="content" v-model="markdown"></textarea>
        </fieldset>
        <fieldset class="field">
          <div class="shrink">
            <button id="submit-recipe" type="submit">Submit</button>
          </div>
        </fieldset>
      </form>

      <div class="recipe-preview">
        <h3>Preview</h3>

        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <div v-html="html" class="recipe-preview-content"></div>
      </div>

    </section>
  </div>`,

  methods: {
    ...Vuex.mapMutations('recipe', ['SET_RECIPE']),
    processMarkdown(input) {
      return input.split('\n').reduce((accum, line, i, lines) => {

      // Create unordered list tags
        if (line.startsWith('-')) {
          const prev = lines[i - 1]
          const next = lines[i + 1]
    
          line = `<li>${line.slice(1).trim()}</li>`
    
          if (!prev || !prev.startsWith('-'))
            line = `<ul>${line}`
          else if (!next || !next.startsWith('-'))
            line = `${line}</ul>`
        }
    
        // Create heading tags
        line = line.replace(/#{6}.*/g, x => x.replace(x, `<h6>${x.slice(6)}</h6>`))
        line = line.replace(/#{5}.*/g, x => x.replace(x, `<h5>${x.slice(5)}</h5>`))
        line = line.replace(/#{4}.*/g, x => x.replace(x, `<h4>${x.slice(4)}</h4>`))
        line = line.replace(/#{3}.*/g, x => x.replace(x, `<h3>${x.slice(3)}</h3>`))
        line = line.replace(/#{2}.*/g, x => x.replace(x, `<h2>${x.slice(2)}</h2>`))
        line = line.replace(/#{1}.*/g, x => x.replace(x, `<h1>${x.slice(1)}</h1>`))
    
        // Create paragraph tags
        line = line.replace(/.*(?!\n)?/g, x => {
          if (!!x && !x.startsWith('<'))
            x = x.replace(x, `<p>${x.trim()}</p>`)
          return x
        })
    
        // Remove <script> tags
        line = line.replace(/<\/?script.*>/g, '')

        return accum + line
      }, '')
    }
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
        this.SET_RECIPE(['markdown', val])
        this.SET_RECIPE(['html', this.processMarkdown(val)])
      }
    },
    html() {
      return this.$store.state.recipe.item.html
    }
  }
}

