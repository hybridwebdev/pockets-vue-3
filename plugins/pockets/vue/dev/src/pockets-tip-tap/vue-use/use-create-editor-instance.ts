//@ts-nocheck
import { extensions, injectEditorKey } from "@/pockets-tip-tap/"
import { onUnmounted, provide, watch } from "vue"
import type { Computed } from "vue"
import { Editor } from '@tiptap/vue-3'

export let useCreateEditorInstance = (content: Computed<string>) => {

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