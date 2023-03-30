//@ts-nocheck
import { Extension } from '@tiptap/core'

export default Extension.create({
    onSelectionUpdate({editor}){
      let { selection } = editor.state
      let target;
      if(!selection.node) {
        target = selection.$head.parent
      }
      if(selection.node) {
        target = selection.node
      }
      editor.nodeTree.active = {
        ...target
      }
      // console.log( editor.state.selection.$head.parent)
    }
})