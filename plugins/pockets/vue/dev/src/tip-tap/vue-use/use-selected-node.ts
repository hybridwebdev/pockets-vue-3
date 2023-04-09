import type { Editor } from '@tiptap/core'
import { isNodeSelection } from '@tiptap/core'

import { 
  ref,
  onMounted,
  onUnmounted,
} from "vue"

export let useSelectedNode = ( editor: Editor ) => {
  
  let nodeRef = ref<any>(false)

  let updateHandler = (view) => nodeRef.value = getSelectedNode(editor) 

  onMounted( () => editor.on('transaction', updateHandler ) )

  onUnmounted( () => editor.off('transaction', updateHandler ) )

  return nodeRef
}

export let getSelectedNode = ( editor:Editor ) => {

  let { selection } = editor.state
  let { view } = editor
  let node;
  let pos;

  if(selection.$from.depth === 0) {
    return false
  }

  if( isNodeSelection(selection) ) {
      node = selection.node
      pos = selection.$anchor.pos
  }
  if( !isNodeSelection(selection) ) {
    node = selection.$head.parent
    pos = selection.$from.before(selection.$from.depth)
  }

  let props = new Proxy(node.attrs, {
    set: (target, key: string, value) => {
      view.dispatch( view.state.tr.setNodeAttribute(pos, key, value) )
      target[key] = value
      return true
    },
    get: (target, key) =>  target[key],
  })

  return {
    props
  }

}