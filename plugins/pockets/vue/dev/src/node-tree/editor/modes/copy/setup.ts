import { reactive, computed } from "vue"
import { editor } from "@/node-tree/editor"
import { move } from "@/node-tree/create-tree-api/move/"
export let setup = (props) => {

    let selectNode = () => {
        if(editor.active){
            editor.selectedNodes = [ editor.active ]
            editor.active = false
        }
    }
    
    let cancel = () => {
        editor.selectedNodes = []
    }

    let selected = computed(() => editor.selectedNodes[0] ?? false )

    let confirm = (location) => {
        let path = api.adder.add[location]()
        if(editor.active) {
            editor.active = editor.active.getNode(path)
            cancel()
        }
    }
    let api = reactive({
        cancel,
        confirm,
        
        selectNode,
        adder: {
            add: computed( () => move( editor.active, selected.value ) )
        },
        selected,
        editor
    } )

    return api

}
