<template lang='pug'>

pockets-popup-menu(
  :triggers='[]'
  :shown="true"
  placement='top'
  theme='tip-tap-menu'
  :positioning-disabled='true'
  v-if='editor.nodeTree.active'
  :result='position'
)
  div() aaaaaaaaaaa
  template(#popper)
    div(
      @click='editor.nodeTree.inMenu = true'
    )
      | {{editor.nodeTree.active}}
      slot()
</template>
<script lang='ts'>
import { 
  inject,
  computed,
  ref
} from "vue"
import { BubbleMenuPlugin } from './base'

let setup = () => {
  
  let editor = inject('tip-tap-editor')
  let position = {
    top: "100px"
  }
  return {
    editor,
    position
  }

}
export default {
  setup
}

</script>
<style lang='scss'>
.v-popper--theme-tip-tap-menu {
  position: fixed;
  width: 300px;
  
}
</style>