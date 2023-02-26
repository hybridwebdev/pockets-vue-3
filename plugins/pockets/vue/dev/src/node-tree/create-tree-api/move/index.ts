import type { TreeNodeApi } from "@/node-tree/types"
import { dropApi } from "@/node-tree/types"

export let hasSameParent = (target: TreeNodeApi, selected: TreeNodeApi) => {
    if(!selected.parent || !target.parent) return;
    return selected.parent.paths.full === target.parent.paths.full
}

export let hasSameIndex = (target: TreeNodeApi, selected: TreeNodeApi) => target.paths.index == selected.paths.index

export let targetContainsSelected = (target: TreeNodeApi, selected: TreeNodeApi) => {
    if(
        !target 
        || !target.parent 
        || !selected
    ) return false
    if( target.paths.full.includes(selected.paths.full) ) return true
    return false
}

export let getIndexes = (target: TreeNodeApi, selected: TreeNodeApi) => ({
    target: target.paths.index,
    selected: selected.paths.index
})

export let isAdjacent = ( target: TreeNodeApi, selected: TreeNodeApi, index: number) => {
    let indexes = getIndexes(target, selected)
    let sameParent = hasSameParent(target, selected)
    if( sameParent ){
        if( indexes.selected+ index == indexes.target) {
            /**
                if the item left of it is the target 
                target then it can't move
            */
            return false;
        }
    }
}

export let createDropApi = ( target: TreeNodeApi, selected: TreeNodeApi ) : dropApi => {

    let indexes = getIndexes(target, selected)
    let sameParent = hasSameParent(target, selected)
 
    let dropAdjacent = (dropIndex:number) => {
        if(dropIndex < 0) dropIndex = 0
        let node = selected.node
        selected.remove.self()
        return target.parent.add.inside(node, dropIndex)
    }

    let before = () => {
        
        if( isAdjacent(target, selected, 1) ) return false
         
        return () => dropAdjacent(indexes.target-1)
    }
    
    let after = () => {
        
        if( isAdjacent(target, selected, -1) ) return false
 
        if(sameParent === true) {
            if(indexes.target > indexes.selected) {
                /**
                    Compensate for the fact target shifts one left due to removal of selected
                */
                return () => dropAdjacent(indexes.target)         
            }
        }
        return () => dropAdjacent(target.paths.index+1 )
    }

    let inside = () => {
        if(!target.node.nodes) return false;
        return () => {
            let node = selected.node
            selected.remove.self()
            return target.add.inside(node)
        }
    }

    return {
        before: before(),
        after: after(),
        inside: inside(),
    }

}
 
export let move = ( target: TreeNodeApi | false, selected: false | TreeNodeApi ) : dropApi => {
    
    let invalid = {
        inside: false,
        before: false,
        after: false,
    }

    if(
           !target 
        || !target.node 
        || !selected 
        || !selected.node
        /**
            root nodes cant be moved
        */
        || !selected.parent
        || targetContainsSelected(target, selected)
        || hasSameParent(target, selected) && hasSameIndex(target, selected)
    )  return invalid

    return createDropApi(target, selected)
    
}
