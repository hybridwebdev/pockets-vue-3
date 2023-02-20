import { reactive, computed, toRefs } from "vue"
import { editor } from "@/node-tree/editor"

export let setup = (props) => {
    
    let hasSameParent = computed(() => api.selected.parent.paths.full == api.active.parent.paths.full)
    
    let indexes = computed(() => ({
        active: api.active.paths.index,
        selected: api.selected.paths.index
    }))
    
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

        let { indexes } = api 

        if(
            api.hasSameParent
            &&
            ['before', 'after'].includes(location)
        ) {
            
            if(indexes.active == indexes.selected) {
                return;
            }

            if(location=='before'){
                if(indexes.active-1 == indexes.selected) {
                    return;
                }
                if(indexes.active > indexes.selected) {
                    indexes.active--
                }
            }

            if(location=='after'){
                if(indexes.active+1 == indexes.selected)  {
                    return;
                }
            }
            return api.selected.move.self(indexes.active)
        }   

    }
    let confirm = (location) => {
        let p = drop(location)
        console.log(p)

    }
    
    let selected = computed(() => api.selectedNodes[0] ?? false )

    let api = reactive( {
        selectedNodes,
        active, 
        selected,
        trigger,
        confirm,
        cancel,
        hasSameParent,
        indexes
    } )

    return api

}