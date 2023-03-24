<template lang='pug'>
    
bubbleMenu(
  :editor='editor'
  class='d-flex p-1 bg-accent-dk align-items-center'
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
import { BubbleMenu } from '@tiptap/vue-3'
import { inject } from "vue"
let editor = inject('tip-tap-editor')
</script>