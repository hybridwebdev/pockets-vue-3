<template lang='pug'>
div( 
  v-if='editor'
  class='border border-2 border-accent-dk'
)
  div(
    class='d-flex bg-accent-dk gap-0'
  )
    button( 
      class='btn btn-accent-dk'
      @click="editor.chain().focus().toggleBold().run()"
      :class="[ { 'active': editor.isActive('bold') }, btnClass ]"

    )
      i(class='fa fa-bold')

    button( 
      class='btn btn-accent-dk'
      @click="editor.chain().focus().toggleItalic().run()"
      :class="[ { 'active': editor.isActive('italic') }, btnClass ]"

    )
      i(class='fa fa-italic')
      
  editor-content( 
    :editor="editor" 
    class='editor-wrapper'
  )

</template>
<script lang='ts' setup>
import { onMounted, ref, onUnmounted } from "vue"
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

let emit = defineEmits(['update:modelValue'])

let btnClass = 'rounded-0'

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

onMounted( () => editor = new Editor(editorConfig) )

onUnmounted( () => editor.destroy() )

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