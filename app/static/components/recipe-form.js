const TheRecipeForm = (function() {

  return {
    name: 'TheRecipeForm',
    props: {
      label: String,
      title: String,
      description: String,
      markdown: String,
    },
    template: // html
    `<div>
      <h4 v-if="label">{{label}}</h4>
      <form @submit.prevent="$emit('submit')">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            class="form-control"
            type="text" id="title"
            required
            :value="title"
            @input="$emit('update:title', $event.target.value)"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            class="form-control"
            type="text"
            id="description"
            :value="description"
            @input="$emit('update:description', $event.target.value)"
          />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            rows="10"
            style="resize: none;"
            class="form-control"
            type="text"
            id="content"
            :value="markdown"
            @input="$emit('update:markdown', { markdown: $event.target.value, html: processMarkdown($event.target.value)});"
          ></textarea>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" id="submit-recipe" type="submit">Submit</button>
        </div>
      </form>
    </div>`,
    methods: {
      processMarkdown(input) {
        return input.split('\n').reduce((accum, line, i, lines) => {

          line = line.replace(/</g, '&lt;')
          line = line.replace(/>/g, '&gt;')
  
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

          // shortcuts
          line = line.replace(/{ing}|:ing/g, 'Ingredients')
          line = line.replace(/{ins}|:ins/g, 'Instructions')
  
          return accum + line
        }, '')
      }
    },
  }

})()