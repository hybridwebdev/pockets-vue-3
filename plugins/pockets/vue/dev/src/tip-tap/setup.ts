//@ts-nocheck
import { onUnmounted, provide, computed, watch, reactive } from "vue"
import { extensions } from "./extensions"
import { Editor } from '@tiptap/vue-3'
import { EditorSchema } from "@/tip-tap/types"

let pockets = reactive<EditorSchema>({
  nodes: {},
  options: {},
  active: false
})

export let createEditorInstance = config => {

  let { content } = config

  let editorConfig = {
    injectCSS: false,
    autofocus: true,
    extensions,
    content: content.value,
    onUpdate: () => content.value = editor.getHTML(),
  }

  let editor = new Editor(editorConfig)

  editor.pockets = pockets

  onUnmounted( () => editor.destroy() )

  provide('tip-tap-editor', editor)
  
  watch(content, (v) => {
    /**
      Syncs editor instances
    */
    console.log({ json: editor.getJSON(), html: editor.getHTML()})
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

  let editor = createEditorInstance( {
    content
  } )

  return { 
    editor
  }

}
