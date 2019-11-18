

export default {
  name: 'j-btn',
  props: {
    busy: Boolean,
    kind: {
      type: String,
      default: 'primary'
    }
  },
  template: //html
  `<button v-on="$listeners" v-bind="$attrs" type="button" :disabled="busy" class="btn" :class="btnClass">
    <span v-if="busy" class="spinner-border" role="status"></span>
    <span v-else>
      <slot />
    </span>
  </button>`,
  computed: {
    btnClass() {
      return this.kind ? `btn-${this.kind}` : ''
    }
  }
}