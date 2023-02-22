import { reactive, computed, toRefs, ref, toRef, Ref } from "vue"
import { editor } from "@/node-tree/editor"

import type { TreeNodeApi } from "@/node-tree/types"

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
        abstract: computed(() => abstract( editor.active, selected.value ))
    } )

    return api

}


let abstract = ( active: TreeNodeApi | false, selected: false | TreeNodeApi ) => {
    
    type api = {
        inside: number | boolean | (() => any)
        before: number | boolean | (() => any)
        after : number | boolean | (() => any)
    }

    let invalid:api = {
        inside: false,
        before: false,
        after: false
    }

    if(!active || !selected)  return invalid

    let indexes = {
        active: active.paths.index,
        selected: selected.paths.index
    }

    let sameParent = () => {
        if(!selected.parent || !active.parent) return;
        return selected.parent.paths.full == active.parent.paths.full
    }

    let sameIndex = () => indexes.active == indexes.selected

    let moveFn = (index: number) => {
        return index
        //return () => selected.move.self(index)
    }
    let before = () => {

        if( sameParent() === true ){
    
            if( sameIndex() ) return false;

            if( indexes.selected+1 == indexes.active) {
                /**
                    if the item left of it is the active 
                    target then it can't move
                */
                return false;
            }

            if(indexes.active > indexes.selected) {
                /*
                    nudging it up one so that it doesn't 
                    replace its sibling
                */
                return moveFn(indexes.active--)
            }

            return moveFn(indexes.active)

        }

        return false

    }
    
    let after = () => {

        if( sameParent() === true ) {
            
            if( sameIndex() ) return false;

            if(indexes.selected-1 == indexes.active)  {
                 /**
                    if the item right of it is the active 
                    target then it can't move
                */
                return false;
            }
        
            return moveFn(indexes.active)

        }

        return false;
    }

    let inside = () => {
        return false
        // return 'hello world'
    }

    let api:api = {
        before: before(),
        after: after(),
        inside: inside()
    }

    return api
}
