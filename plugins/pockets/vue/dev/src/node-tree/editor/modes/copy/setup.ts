import { reactive, computed, toRefs } from "vue"
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
        let { selected, active } = api

        let index = {
            active: active.paths.index,
            selected: selected.paths.index
        }

        if(
            selected.parent.paths.full == active.parent.paths.full
            &&
            ['before', 'after'].includes(location)
        ) {
            console.log(index)
            if(location == 'before' && index.active-1 === index.selected) {
                console.log('samesies')
            }
            // if(location=='before'){
            //     index.active--
            // }
            // if(location=='after'){
            //     index.active++
            // }
            // if(location=='before') {
            //     index.active--
            // }
            // if(location=='after') {
            //     index.active++
            // }
            console.log(index)
            // if(index == selected.paths.index) {
            //     console.log('same')
            // }
            
            // return selected.move.self(index)
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
        cancel
    } )

    return api
}