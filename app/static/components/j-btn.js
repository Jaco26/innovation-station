

export default {
  name: 'j-btn',
  functional: true,
  props: {
    outline: Boolean,
    busy: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    size: String,
  },
  render(h, ctx) {
    let classes = `btn`

    if (ctx.props.outline) classes += ` btn-outline-${ctx.props.color}`
    else classes += ` btn-${ctx.props.color}`

    if (ctx.props.size) classes += ` btn-${ctx.props.size}`

    return h('button',
      {
        ...ctx.data,
        attrs: {
          type: ctx.data.attrs.type || 'button',
          disabled: ctx.props.busy || ctx.data.attrs.disabled,
        },
        class: classes,
      },
      ctx.props.busy ? [h('span', { class: 'spinner-border', attrs: { role: 'status' } })] : ctx.children
    )
  }
}

