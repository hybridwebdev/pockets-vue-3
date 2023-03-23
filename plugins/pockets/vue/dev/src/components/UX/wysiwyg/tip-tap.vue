<template lang='pug'>
div()
  editor-content( 
    v-if='editor'
    :editor="editor" 
    class='editor-wrapper'
  )
  FloatingMenu(
    v-if='editor'
    :editor='editor'
  )
    //- format-buttons() 
    //- element-selector()
  bubbleMenu(
    v-if='editor'
    :editor='editor'
  )
    //- format-buttons() 
    //- element-selector()
    
</template>
<script lang='ts'>
//@ts-nocheck
import { onMounted, ref, onUnmounted, provide, computed, watch } from "vue"
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, BubbleMenu, FloatingMenu  } from '@tiptap/vue-3'
import formatButtons from "./format-buttons"
import elementSelector from "./element-selector"

export let createInstance = ( { content } ) => {

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
    content: content.value,
    onUpdate: () => content.value = editor.getHTML()  ,
  }

  let editor = new Editor(editorConfig)

  onUnmounted( () => editor.destroy() )

  provide('tip-tap-editor', editor)

  return { 
    editor, 
  }

}

let setup = ( props, { emit } )  => {

  let content = computed( {
    get: ( ) => props.modelValue,
    set: (v) => emit( 'update:modelValue', v)
  } ) 

  let { editor } = createInstance( {
    content
  } )

  watch(content, (v) => {
      if (editor.getHTML() === v) {
        return
      }

      editor.commands.setContent(v, false)
  } )

  return { 
    editor
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