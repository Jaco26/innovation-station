

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

    const attrs = ctx.data.attrs || {}

    if (ctx.props.outline) classes += ` btn-outline-${ctx.props.color}`
    else classes += ` btn-${ctx.props.color}`

    if (ctx.props.size) classes += ` btn-${ctx.props.size}`

    return h('button',
      {
        ...ctx.data,
        attrs: {
          type: attrs.type || 'button',
          disabled: ctx.props.busy || attrs.disabled,
        },
        class: classes,
      },
      ctx.props.busy ? [h('span', { class: 'spinner-border', attrs: { role: 'status' } })] : ctx.children
    )
  }
}

