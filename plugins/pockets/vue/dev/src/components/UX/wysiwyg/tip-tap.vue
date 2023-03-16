<template lang='pug'>

div()
  editor-content( 
    v-if='editor'
    :editor="editor" 
    class='editor-wrapper'
    v-bind='props'
  )
  bubbleMenu(
    :editor='editor'
    v-if='editor'
  )
    format-buttons() 
    element-selector()
    
</template>
<script lang='ts' setup>
import { onMounted, ref, onUnmounted, provide } from "vue"
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, BubbleMenu  } from '@tiptap/vue-3'
import formatButtons from "./format-buttons"
import elementSelector from "./element-selector"

let emit = defineEmits(['update:modelValue'])

let props = defineProps( {
    modelValue: {
      type: String,
      required: true
    },
} )

let editor = ref(false)

let editorConfig = {
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

</script>
<style lang='scss'>
.editor-wrapper {
  .ProseMirror {
    outline: none;
  }
}
</style>