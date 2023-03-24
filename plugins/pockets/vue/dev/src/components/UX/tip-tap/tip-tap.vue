<template lang='pug'>
editor-content( 
  :editor="editor" 
  class='editor-wrapper'
  v-bind='$attrs'
)
toolBar()
</template>
<script lang='ts'>
import { EditorContent } from '@tiptap/vue-3'
import toolBar from "./tool-bar/menu.vue"
import { setup } from "./setup"
export default {
  components: { 
    EditorContent, 
    toolBar
  },
  props: {
      modelValue: {
        type: String,
        required: true
      },
  },
  setup
}

</script>
<style lang='scss'>
.editor-wrapper {
  .ProseMirror {
    outline: none;
  }
}
</style>