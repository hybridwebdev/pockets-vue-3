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
    .is-empty {
      min-height:10px
    }
    p.is-empty::before {
      color: #adb5bd;
      content: attr(data-placeholder);
      height: 0;
      pointer-events: none;
      float:left;
    }
  }
  .has-focus {
    border-radius: 3px;
    box-shadow: 0 0 0 3px #68cef8;
  }
}

</style>