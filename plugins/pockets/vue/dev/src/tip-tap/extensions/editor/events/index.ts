//@ts-nocheck
import { Extension } from '@tiptap/core'

let selectHandler = ({ editor }) => {
  let { selection } = editor.state
  console.log(selection.jsonID, 'Node ID in select Handler')
  let { view } = editor
  let node;
  let pos;
  if(!selection.node) {
    node = selection.$head.parent
    pos = selection.$from.before(1)
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
    attrs
  }
}
export default Extension.create({
  addKeyboardShortcuts () {
    return {
      Enter: ({ editor }) => {
        return true
      }
    }
  },
  onFocus: selectHandler,
  onSelectionUpdate: selectHandler
})