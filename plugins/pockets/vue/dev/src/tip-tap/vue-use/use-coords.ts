import type { Editor } from '@tiptap/core'

import { isNodeSelection, posToDOMRect } from '@tiptap/core'

import { 
  ref,
  onMounted,
  onUnmounted,
} from "vue"

export let useCoords = (editor: Editor) => {

  let coords = ref<null | DOMRect>(null)
  
  let updateHandler = (view) => coords.value = getCoords(editor) 

  onMounted( () => editor.on('transaction', updateHandler ) )

  onUnmounted( () => editor.off('transaction', updateHandler ) )

  return coords
  
}

export let getCoords = (editor: Editor) => {
  
  let { state, view } = editor
  const { ranges } = state.selection
  const from = Math.min(...ranges.map(range => range.$from.pos))
  const to = Math.max(...ranges.map(range => range.$to.pos))
  
  if (isNodeSelection(state.selection)) {

    let node = view.nodeDOM(from) as HTMLElement

    const nodeViewWrapper = node.dataset.nodeViewWrapper ? node : node.querySelector('[data-node-view-wrapper]')

    if (nodeViewWrapper) {
      node = nodeViewWrapper.firstChild as HTMLElement
    }

    if (node) {
      return node.getBoundingClientRect()
    }

  }

  return posToDOMRect(view, from, to)

}