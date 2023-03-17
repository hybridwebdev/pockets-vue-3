<template lang='pug'>

editor-content( 
  v-if='editor'
  :editor="editor" 
  class='editor-wrapper'
)
FloatingMenu(
  v-if='editor'
  :editor='editor'
)
  format-buttons() 
  element-selector()
bubbleMenu(
  v-if='editor'
  :editor='editor'
)
  format-buttons() 
  element-selector()
  
</template>
<script lang='ts'>

import { onMounted, ref, onUnmounted, provide } from "vue"
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, BubbleMenu, FloatingMenu  } from '@tiptap/vue-3'
import formatButtons from "./format-buttons"
import elementSelector from "./element-selector"
let setup = (props, { emit }) => {
    
  let editor = ref(false)

  let editorConfig = {
    autofocus: true,
    editorProps: {
      attributes: {
        class: '',
      },
    },
    extensions: [
      StarterKit,
    ],
    content: props.modelValue,
    onUpdate: () => emit( 'update:modelValue', editor.value.getHTML() ) ,
  }

  onMounted( () => editor.value = new Editor(editorConfig) )

  onUnmounted( () => editor.value.destroy() )

  provide('tip-tap-editor', editor)

  return { 
    editor, 
  }

}

export default {
  components: { EditorContent, BubbleMenu, FloatingMenu, formatButtons, elementSelector },
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