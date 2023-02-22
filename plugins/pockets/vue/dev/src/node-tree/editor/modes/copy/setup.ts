import { reactive, computed } from "vue"
import { editor } from "@/node-tree/editor"
import { move } from "./move"
export let setup = (props) => {

    let selectNode = () => {
        if(editor.active){
            editor.selectedNodes.push(editor.active)
            editor.active = false
        }
    }
    
    let cancel = () => {
        editor.selectedNodes = []
    }
    
    let confirm = (location) => {
        return add.value[location]()
    }
    
    let add = computed( () => move( editor.active, selected.value ) )

    let selected = computed(() => editor.selectedNodes[0] ?? false )

    let api = reactive({
        cancel,
        confirm,
        
        selectNode,
        adder: {
            add
        },
        selected,
    } )

    return api

}
