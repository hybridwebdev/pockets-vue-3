import { reactive, computed } from "vue"
import { editor } from "@/node-tree/editor"
import { dragDrop } from "./api" 
export let setup = (props) => {
    let selectNode = () => {
        if(editor.active){
            editor.selectedNodes = [ editor.active ]
            editor.active = false
        }
    }
    
    let cancel = () => {
        editor.active = selected.value
        editor.selectedNodes = []
    }

    let selected = computed(() => editor.selectedNodes[0] ?? false )

    let confirm = (location) => {
        let node = api.adder.add[location]()
        if(editor.active) {
            editor.active = node
            editor.selectedNodes = []
        }
    }
    let api = reactive({
        cancel,
        confirm,
        
        selectNode,
        adder: {
            add: computed( () => dragDrop( editor.active, selected.value, props.removeSelected ) )
        },
        selected,
        editor
    } )

    return api

}
