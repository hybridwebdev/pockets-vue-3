<template>
  <editor-content v-if='editor' :editor="editor" class='bg-grey-lt'/>
</template>
<script lang='ts' setup>
import { onMounted, ref, onUnmounted } from "vue"
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

let emit = defineEmits(['update:modelValue'])

let props = defineProps( {
    modelValue: {
      type: String,
      required: true
    },
} )

let editor = $ref(false)

let editorConfig = {
    extensions: [
      StarterKit,
    ],
    content: props.modelValue,
    onUpdate: () => emit( 'update:modelValue', editor.getHTML() ) ,
}

onMounted( () => {
  editor = new Editor(editorConfig)
} )

onUnmounted( () => {
  editor.destroy()
} )

</script>