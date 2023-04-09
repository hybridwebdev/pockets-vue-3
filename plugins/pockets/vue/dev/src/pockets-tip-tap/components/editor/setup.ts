import { useCreateEditorInstance } from "@/pockets-tip-tap"
import { computed } from "vue"

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
