import { toRaw, reactive, computed, toRefs  } from "vue"
import { editor } from "@/node-tree/editor"

export let setup = (props) => {

    let {
        active,
        selectedNodes
    } = toRefs(editor)

    let trigger = () => {
        if(api.active){
            api.selectedNodes.push(api.active)
            //api.active = false
        }
    }

    let confirm = (location) => {

        let node = toRaw (api.selected.node)

        let cb = api.active.add[location]
        
        cb(node)
        
        //api.selected.remove.self()

        api.selectedNodes = []

    }

    
    let selected = computed(() => api.selectedNodes[0] ?? false )

    let api = reactive( {
        selectedNodes,
        active, 
        selected,
        trigger,
        confirm
    } )

    return api
}