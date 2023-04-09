import type { Editor } from '@tiptap/core'
import { 
  ref,
  onMounted,
  onUnmounted,
} from "vue"

export let useSelectedNode = ( editor: Editor ) => {
  
  let nodeRef = ref(false)

  let updateHandler = (view) => nodeRef.value = getSelectedNode(editor) 

  onMounted( () => editor.on('transaction', updateHandler ) )

  onUnmounted( () => editor.off('transaction', updateHandler ) )

  return nodeRef
}

export let getSelectedNode = ( editor:Editor ) => {

  // let { selection } = editor.state
  // let { view } = editor
  // let node;
  // let pos;
  
  // if(selection.$from.depth === 0) {
  //   editor.nodeTree.active = false
  // }

  // if(!selection.node) {
  //   node = selection.$head.parent
  //   pos = selection.$from.before(selection.$from.depth)
  // }
  
  // if(selection.node) {
  //   node = selection.node
  //   pos = selection.$anchor.pos
  // }

  // let props = new Proxy(node.attrs, {
  //   set: (target, key, value) => {
  //     view.dispatch( view.state.tr.setNodeAttribute(pos, key, value) )
  //     target[key] = value
  //     return true
  //   },
  //   get: (target, key) =>  target[key],
  // })

  return false;
  
}