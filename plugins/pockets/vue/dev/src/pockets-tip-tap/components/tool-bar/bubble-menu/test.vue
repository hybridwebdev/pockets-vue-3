<template lang='pug'>
div()
  div(class='p-1') 
    | {{ coords }}
  div(class='p-1') 
    | {{ node}}
  slot()
</template>
<script lang='ts'>
import { useCoords, useSelectedNode, injectEditor } from "@/pockets-tip-tap//"

let setup = (props) => {
  let editor = injectEditor()
  return {
    coords: useCoords(editor),
    node: useSelectedNode(editor)
  }
}

export default {
  setup,
}

</script>
<style lang='scss'>
.v-popper--theme-tip-tap-menu {
  position: fixed;
  width: 300px;
  
}
</style>