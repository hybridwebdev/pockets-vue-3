<template lang='pug'>
div( 
  v-if='editor'
  class='border border-2 border-accent-dk'
)
  div(
    class='d-flex bg-accent-dk gap-0'
  )
    format-buttons() 

  editor-content( 
    :editor="editor" 
    class='editor-wrapper'
  )

</template>
<script lang='ts' setup>
import { onMounted, ref, onUnmounted, provide } from "vue"
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import formatButtons from "./format-buttons"

let emit = defineEmits(['update:modelValue'])

let props = defineProps( {
    modelValue: {
      type: String,
      required: true
    },
} )

let editor = ref(false)

let editorConfig = {
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
    padding: 10px;
    outline: none;
    background: var(--bs-grey-lt)
  }
}
</style>