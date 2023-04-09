<template lang='pug'>

div()
  | hello world
  slot()
</template>
<script lang='ts'>

import { 
  inject,
  computed,
  ref,
  onMounted,
  onUnmounted
} from "vue"

import BubbleMenuPlugin from './plugin'

let props = {
  pluginKey: {
    type: String,
    default: 'floatingMenu',
  },
}

let setup = (props) => {
  
  let editor = inject('tip-tap-editor')

  onMounted(() => {
    editor.registerPlugin( BubbleMenuPlugin( {
      props,
      editor,
    } ) )
  })

  onUnmounted( () => editor.unregisterPlugin( props.pluginKey ) )

  return {
    editor,
  }

}

export default {
  setup,
  props
}

</script>
<style lang='scss'>
.v-popper--theme-tip-tap-menu {
  position: fixed;
  width: 300px;
  
}
</style>