<template lang='pug'>
bubbleMenu(
  :editor='editor'
  class='d-flex p-1 bg-accent-dk align-items-center'
  :shouldShow='shouldShow'
)
  node-interface()
  //- element-selector()
  //- format-buttons() 
  //- fontColor()
  //- fontFamily()
</template>
<script lang='ts' setup>
import nodeInterface from "./node-interface"
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
  return editor.nodeTree.active && editor.nodeTree.active.selectionType == 'text'
}
</script>