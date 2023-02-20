import { toRaw, reactive, computed, toRefs, nextTick  } from "vue"
import { editor } from "@/node-tree/editor"

export let setup = (props) => {

    let {
        active,
        selectedNodes
    } = toRefs(editor)

    let trigger = () => {
        if(api.active){
            api.selectedNodes.push(api.active)
            api.active = false
        }
    }
    
    let cancel = () => {
        api.selectedNodes = []
    }
    let drop = (location) => {
        let node = toRaw (api.selected.node)
        let cb = api.active.add[location]
        cb(node)
    }
    let confirm = (location) => {
        
        let { selected, active }  = api
        
        var cb = () => selected.getNode(selected.paths.path)

        // if(
        //     selected.parent.paths.full == active.parent.paths.full
        // ) {
        //     let { index } = selected.paths
        //     if(location=='before') {
        //         index++
        //     }
        //     cb = () => selected.getNode(selected.parent.paths.path.concat(index) )
        // }   
        
        drop(location)

        nextTick(() => {
            cb().remove.self()
            api.selectedNodes = []
            api.active = false
        })
    }

    
    let selected = computed(() => api.selectedNodes[0] ?? false )

    let api = reactive( {
        selectedNodes,
        active, 
        selected,
        trigger,
        confirm,
        cancel
    } )

    return api
}