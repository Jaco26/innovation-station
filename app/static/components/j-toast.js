
export default {
  name: 'j-toast',
  props: {
    show: Boolean,
    kind: {
      type: String,
      default: 'success',
    },
    closeAfter: Number,
  },
  template: //html
  `<transition name="j-toast">
    <div v-if="show" class="toast p-3" :class="toastClass" :style="toastStyle">
      <div class="d-flex justify-content-between align-items-center">
        <slot />
        <button v-if="!closeAfter" type="button" class="ml-2 mb-1 close" aria-label="Close" @click="$emit('update:show', false)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </transition>`,
  data() {
    return {
      toastStyle: {
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: '999',
        minWidth: '200px',
        borderRadius: '2px',
      }
    }
  },
  computed: {
    toastClass() {
      switch (this.kind) {
        case 'success': return 'bg-success text-light'
        case 'danger': return 'bg-danger text-light'
        case 'info': return 'bg-info'
        case 'warning': return 'bg-warning'
      }
    }
  },
  watch: {
    show(val) {
      if (this.closeAfter) {
        let handle = setTimeout(() => {
          this.$emit('update:show', false)
          clearTimeout(handle)
        }, this.closeAfter)
      }
    }
  }
}


