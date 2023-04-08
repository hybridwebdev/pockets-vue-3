<template lang='pug'>
bubble-menu()
  template(#popper)
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
import bubbleMenu from "./bubble-menu/index.vue"
</script>

