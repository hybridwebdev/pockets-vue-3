//@ts-nocheck
import { Extension } from '@tiptap/core'

let selectHandler = ({ editor, transaction, event }) => {
  
  let { selection } = editor.state
  let { view } = editor
  let node;
  let pos;
  
  if(selection.$from.depth === 0) return;

  if(!selection.node) {
    node = selection.$head.parent
    pos = selection.$from.before(selection.$from.depth)
  }
  
  if(selection.node) {
    node = selection.node
    pos = selection.$anchor.pos
  }

  let attrs = new Proxy(node.attrs, {
    set: (target, key, value) => {
      view.dispatch( view.state.tr.setNodeAttribute(pos, key, value) )
      target[key] = value
      return true
    },
    get: (target, key) =>  target[key],
  })

  editor.nodeTree.active = {
    attrs,
    selectionType: selection.jsonID,
    name: node.type.name
  }

}

export default Extension.create({
  onFocus: selectHandler,
  onSelectionUpdate: selectHandler
})