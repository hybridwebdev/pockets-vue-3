import type { TreeNodeApi } from "@/node-tree/types"
import { dropApi } from "@/node-tree/types"

let hasSameParent = (active, selected) => {
    if(!selected.parent || !active.parent) return;
    return selected.parent.paths.full == active.parent.paths.full
}

let hasSameIndex = (active, selected) => active.paths.index == selected.paths.index

export let createModule = ( active: TreeNodeApi, selected: TreeNodeApi ) : dropApi => {

    let indexes = {
        active: active.paths.index,
        selected: selected.paths.index
    }

    let sameParent = hasSameParent(active, selected)
 
    let dropAdjacent = (dropIndex:number, removeIndex: number = indexes.selected) => {
        
        if(dropIndex < 0) dropIndex = 0
        if(removeIndex < 0) removeIndex = 0

        let node = selected.node
        selected.parent.remove.child(removeIndex)
        return active.parent.add.inside(node, dropIndex)
    }
    let before = () => {
        if( sameParent ){
            if( indexes.selected+1 == indexes.active) {
                /**
                    if the item left of it is the active 
                    target then it can't move
                */
                return false;
            }
        }
        return () => dropAdjacent(indexes.active-1)

    }
    
    let after = () => {
        // if( sameParent === true ) {
        //     if(indexes.selected-1 == indexes.active )  {
        //          /**
        //             if the item right of it is the active 
        //             target then it can't move
        //         */
        //         return false;
        //     }
        // }
 
        if(sameParent) {
            if(indexes.active > indexes.selected) {
                /**
                    Compensate for the fact active shifts one left due to removal of selected
                */
                return () => dropAdjacent(indexes.active)         
            }
        }
        return () => dropAdjacent(indexes.active+1)
    }

    let inside = () => {
        if(!active.node.nodes) return false;
        return () => []
    }

    return {
        before: before(),
        after: after(),
        inside: inside(),
    }

}
export let move = ( active: TreeNodeApi | false, selected: false | TreeNodeApi ) : dropApi => {

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
        || hasSameParent(active, selected) && hasSameIndex(active, selected)
    )  return invalid

    return createModule(active, selected)
    
}
