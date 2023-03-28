<template lang='pug'>
bubbleMenu(
  :editor='editor'
  class='d-flex p-1 bg-accent-dk align-items-center'
  :shouldShow='shouldShow'
)
  element-selector()
  format-buttons() 
  fontColor()
  fontFamily()
</template>
<script lang='ts' setup>
import formatButtons from "./format-buttons"
import elementSelector from "./element-selector"
import fontColor from "./font-color"
import fontFamily from "./font-family"
import { BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import {
  Editor, isNodeSelection, isTextSelection, posToDOMRect,
} from '@tiptap/core'
import { inject } from "vue"
let editor = inject('tip-tap-editor')

let shouldShow = function({ view, state, from, to, }){
    const { doc, selection } = state
    const { empty } = selection

    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection)

    // When clicking on a element inside the bubble menu the editor "blur" event
    // is called and the bubble menu item is focussed. In this case we should
    // consider the menu as part of the editor and keep showing the menu
    const isChildOfMenu = this.element.contains(document.activeElement)

    const hasEditorFocus = view.hasFocus() || isChildOfMenu
    if(hasEditorFocus) return true;
    if (!hasEditorFocus || empty || isEmptyTextBlock || !this.editor.isEditable) {
      return false
    }

    return true
  }
</script>