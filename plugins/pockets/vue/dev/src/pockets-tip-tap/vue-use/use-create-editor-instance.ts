//@ts-nocheck
import { extensions } from "@/pockets-tip-tap/"
import { onUnmounted, provide, watch } from "vue"

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

  provide(injectEditorKey, editor)

  onUnmounted( () => editor.destroy() )
  
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