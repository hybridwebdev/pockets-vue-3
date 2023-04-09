<template lang='pug'>

div()
  | hello world
  | {{ coords }}
  slot()
</template>
<script lang='ts'>
import { useCoords } from "./use-coords"
let setup = (props) => {
  return {
    coords: useCoords(props)
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