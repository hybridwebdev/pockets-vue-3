//@ts-nocheck
import { Extension, isNodeSelection, posToDOMRect } from '@tiptap/core'


let nodeFind = (editor) => {
  let { state, view } = editor
  const { ranges } = state.selection
  const from = Math.min(...ranges.map(range => range.$from.pos))
  const to = Math.max(...ranges.map(range => range.$to.pos))
  if (isNodeSelection(state.selection)) {
    let node = view.nodeDOM(from) as HTMLElement
    // support for CellSelections

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
    name: node.type.name,
    position: nodeFind(editor)
  }

}

export default Extension.create({
  onFocus: selectHandler,
  onSelectionUpdate: selectHandler
})