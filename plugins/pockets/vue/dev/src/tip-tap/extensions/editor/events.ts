//@ts-nocheck
import { Extension } from '@tiptap/core'

export default Extension.create({
    onSelectionUpdate( { editor } ){
      let { selection } = editor.state
      console.log(selection)
      let { view } = editor
      let node;
      let pos;
      if(!selection.node) {
        node = selection.$head.parent
        pos = selection.$head.parentOffset
      }
      
      if(selection.node) {
        node = selection.node
        pos = selection.$anchor.pos
      }
      console.log(node.resolve )
      let attrs = new Proxy(node.attrs, {
        set: (target, key, value) => {
          target[key] = value
          view.dispatch(view.state.tr.setNodeMarkup(pos, undefined, {
            [key]: value
          }))
          return true
        },
        get: (target, key) =>  target[key],
      })


      editor.nodeTree.active = {
        attrs
      }
      // console.log( editor.state.selection.$head.parent)
    }
})