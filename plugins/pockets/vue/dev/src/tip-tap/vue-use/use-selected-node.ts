
export let selectHandler = ({ editor }) => {

  let { selection } = editor.state
  let { view } = editor
  let node;
  let pos;
  
  if(selection.$from.depth === 0) {
    editor.nodeTree.active = false
  }

  if(!selection.node) {
    node = selection.$head.parent
    pos = selection.$from.before(selection.$from.depth)
  }
  
  if(selection.node) {
    node = selection.node
    pos = selection.$anchor.pos
  }

  let props = new Proxy(node.attrs, {
    set: (target, key, value) => {
      view.dispatch( view.state.tr.setNodeAttribute(pos, key, value) )
      target[key] = value
      return true
    },
    get: (target, key) =>  target[key],
  })

}