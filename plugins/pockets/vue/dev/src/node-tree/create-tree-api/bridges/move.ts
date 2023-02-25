import type { TreeNodeApi, dropLocations } from "@/node-tree/types"
import { dropApi } from "@/node-tree/types"
import { intersection } from "lodash"

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

    let dropAt = (location: dropLocations, tree ) => {
        return () => {
            // selected.remove.self()
            // return tree.add[location](selected.node)
        }
    }
    let dropAdjacent = (index) => {
        console.log('index', index)
        let node = selected.node
        selected.remove.self()
        return active.parent.add.inside(node, index)
    }
    let before = () => {
        if( sameParent === true ){
            if( indexes.selected+1 == indexes.active) {
                /**
                    if the item left of it is the active 
                    target then it can't move
                */
                return false;
            }
        }
        return () => {
            let index = active.paths.index
            if(sameParent) {
                if(indexes.selected > indexes.active){
                    return dropAdjacent(index-1)
                }
            }
            return dropAdjacent(index)
        }
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
        return () => []
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
