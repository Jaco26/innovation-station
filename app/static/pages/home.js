export default {
  name: 'Home',
  computed: {
    tagName: {
      get() { return this.$store.state.tags.newTagName },
      set(val) { this.$store.commit('tags/SET', ['newTagName', val]) },
    },
  },
  template: //html
  `<div>
    <h1>Recipes</h1>
    <ul style="list-style: none;">
      <li v-for="r in $store.getters['recipes/list']" :key="r.id">
        <router-link :to="'/recipe/' + r.id">
          {{r.title}}
        </router-link>
      </li>
    </ul>
    <input type="text" v-model="tagName" />
    <j-btn :disabled="!tagName.trim().length" @click="$store.dispatch('tags/ADD_TAG')">Add Tag</j-btn>
    <ul style="list-style: none;">
      <li v-for="tag in $store.state.tags.list" :key="tag.id">
        <h3>
          <span class="badge badge-dark">{{tag.name}}</span>
        </h3>
      </li>
    </ul>
  </div>`
  }

