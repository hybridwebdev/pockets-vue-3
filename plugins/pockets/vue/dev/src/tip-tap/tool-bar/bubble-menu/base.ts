//@ts-nocheck
import {
  isNodeSelection, posToDOMRect,
} from '@tiptap/core'
import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'

export class BubbleMenuView {

  constructor(  {state} : BubbleMenuViewProps ) {
    this.state = state
  }
 
  update(view: EditorView, oldState?: EditorState) {
    
    const { state } = view
 
    this.state.coords = this.getCoords(view)

  }

  getCoords = (view: EditorView ) => {
   
    const { state, composing } = view
    const { doc, selection } = state

    const { ranges } = selection
    const from = Math.min(...ranges.map(range => range.$from.pos))
    const to = Math.max(...ranges.map(range => range.$to.pos))
    
    if ( isNodeSelection(state.selection) ) {
        
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
 
}

export const BubbleMenuPlugin = (state: BubbleMenuPluginProps) => {
  return new Plugin({
    key: new PluginKey('terst'),
    view: view => new BubbleMenuView({ view, state }),
  })
}