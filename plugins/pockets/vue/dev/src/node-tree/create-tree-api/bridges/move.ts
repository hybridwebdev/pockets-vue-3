import type { TreeNodeApi } from "@/node-tree/types"

type api = {
    inside: number | boolean | (() => any)
    before: number | boolean | (() => any)
    after : number | boolean | (() => any)
    draggable: boolean
}

export let move = ( active: TreeNodeApi | false, selected: false | TreeNodeApi ) : api => {

    let draggable = () => {
        if( active && active.parent ) return true
        return false
    }
    let activeContainsSelected = () => {

        if(
            !active 
            || !active.parent 
            || !selected
        ) return false

        if( active.paths.full.includes(selected.paths.full) ) return true

        return false

    }
    
    let invalid = {
        inside: false,
        before: false,
        after: false,
        draggable: draggable()
    }

    if(
        !active 
        || !active.node 
        || !selected 
        || !selected.node
        /**
            root nodes cant be moved
        */
        || !selected.parent
        || activeContainsSelected()
    )  return invalid

    let indexes = {
        active: active.paths.index,
        selected: selected.paths.index
    }

    let sameParent = () => {
        if(!selected.parent || !active.parent) return;
        return selected.parent.paths.full == active.parent.paths.full
    }

    let sameIndex = () => indexes.active == indexes.selected

    let moveSelf = (index: number) => () => selected.move.self(index)
    
    let dropAt = (location: "before" | "after" | "inside" ) => {
        return () => {
            let path = active.add[location](selected.node)
            selected.remove.self()
            return path
        }
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
                return moveSelf(indexes.active-1)
            }

            return moveSelf(indexes.active)

        }

        if(!active.parent) return false;

        return dropAt('before')

    }
    
    let after = () => {
        
        if( sameParent() === true ) {
            
            if( sameIndex() ) return false;

            if(indexes.selected-1 == indexes.active )  {
                 /**
                    if the item right of it is the active 
                    target then it can't move
                */
                return false;
            }
            
            return moveSelf(indexes.active + 1)
            
        }

        if(!active.parent) return false;

        return dropAt('after')
        
    }

    let inside = () => {
        return false
    }

    let api:api = {
        before: before(),
        after: after(),
        inside: inside(),
        draggable: draggable()
    }

    return api
}
