import type { TreeNodeApi } from "@/node-tree/types"

type api = {
    inside: number | boolean | (() => any)
    before: number | boolean | (() => any)
    after : number | boolean | (() => any)
}

export let move = ( active: TreeNodeApi | false, selected: false | TreeNodeApi ) : api => {

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
        return () => {
            selected.move.self(index)
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
    }

    let api:api = {
        before: before(),
        after: after(),
        inside: inside()
    }

    return api
}
