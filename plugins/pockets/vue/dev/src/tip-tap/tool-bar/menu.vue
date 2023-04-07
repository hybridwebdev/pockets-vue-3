<template lang='pug'>
pockets-popup-menu(  
    placement='bottom-start' 
    :autoHide="true"
    :triggers='["click"]'
    :delay='0'
)
  span() BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
  template( #popper)
    span() TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
bubbleMenu(
  :editor='editor'
  class='d-flex p-1 bg-accent-dk align-items-center'
)
  fontColor()
  fontFamily()
  element-selector()
  format-buttons() 
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

</script>