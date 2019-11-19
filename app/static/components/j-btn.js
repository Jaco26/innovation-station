

export default {
  name: 'j-btn',
  functional: true,
  props: {
    busy: Boolean,
    kind: {
      type: String,
      default: 'primary'
    }
  },
  render(h, ctx) {
    return h('button',
      {
        ...ctx.data,
        attrs: {
          type: ctx.data.attrs.type || 'button',
          disabled: ctx.props.busy || ctx.data.attrs.disabled,
        },
        class: `btn btn-${ctx.props.kind}`,
      },
      ctx.props.busy ? [h('span', { class: 'spinner-border', attrs: { role: 'status' } })] : ctx.children
    )
  }
}