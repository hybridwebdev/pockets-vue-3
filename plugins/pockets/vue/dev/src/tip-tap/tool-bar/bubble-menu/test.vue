<template lang='pug'>

div()
  | hello world
  | {{ coords }}
  slot()
</template>
<script lang='ts'>
import { useCoords } from "@/tip-tap/vue-use/"
import { injectEditor } from '@/tip-tap/inject-editor'

let setup = (props) => {
  let editor = injectEditor()
  return {
    coords: useCoords(editor)
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