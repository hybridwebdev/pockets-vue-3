//@ts-nocheck
import { onUnmounted, provide, computed, watch } from "vue"
import { extensions } from "@/pockets-tip-tap/"
import { Editor } from '@tiptap/vue-3'
import { injectEditorKey } from "@/pockets-tip-tap"

export let useCreateEditorInstance = content => {

  let editorConfig = {
    injectCSS: false,
    extensions,
    content: content.value,
    onUpdate: () => content.value = editor.getHTML(),
    autofocus: false
  }

  let editor = new Editor(editorConfig)

  onUnmounted( () => editor.destroy() )

  provide(injectEditorKey, editor)
  
  watch(content, (v) => {
    /**
      Syncs editor instances
    */
    console.log({ json: editor.getJSON(), html: editor.getHTML() } )
    if ( editor.getHTML() === v ) return
    editor.commands.setContent(v, false)
  } )

  return editor

}

export let setup = ( props, { emit } )  => {

  let content = computed( {
    get: _ => props.modelValue,
    set: v => emit( 'update:modelValue', v)
  } ) 

  let editor = useCreateEditorInstance( content )

  return { 
    editor
  }

}
