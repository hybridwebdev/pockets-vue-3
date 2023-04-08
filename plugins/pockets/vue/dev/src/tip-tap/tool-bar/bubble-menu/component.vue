<template lang='pug'>

pockets-popup-menu(
  :triggers='[]'
  :shown="true"
  placement='top'
  theme='tip-tap-menu'
  :positioning-disabled='true'
  v-if='editor.nodeTree.active'

)
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
  computed
} from "vue"
import { BubbleMenuPlugin } from './base'

let setup = () => {
  
  let editor = inject('tip-tap-editor')
  
  let positioning = computed(() => {
    return editor.nodeTree.active.position || {
      top: 0
    }
  })
  console.log(positioning)
  return {
    editor,
    positioning 
  }

}
export default {
  setup
}

</script>
<style lang='scss' module>
.v-popper--theme-tip-tap-menu {
  transform: translate3d(0, 0, 0) !important;
  top: 100px;
  width: 300px;
  top: v-bind('positioning.top');

}
</style>