import { reactive, computed, toRefs, ref, toRef, Ref } from "vue"
import { editor } from "@/node-tree/editor"
import { move } from "./move"
export let setup = (props) => {
   
    let hasSameParent = computed(() => {
        if(!api.selected.parent || !api.active.parent) return;
        return api.selected.parent.paths.full == api.active.parent.paths.full
    })
    
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

        
        if( api.hasSameParent && ['before', 'after'].includes(location) ) {
            
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
            return () => api.selected.move.self(indexes.active)
        }   

    }
    let confirm = (location) => {
        let locs = {
            before: drop('before'),
            after: drop('after')
        }
        console.log(locs)
    }
    
    let selected = computed(() => api.selectedNodes[0] ?? false )

    let api = reactive({
        selectedNodes,
        active, 
        selected,
        trigger,
        confirm,
        cancel,
        hasSameParent,
        indexes,
        abstract: computed( () => move( editor.active, selected.value ) )
    } )

    return api

}
