import type { TreeNodeApi } from "@/node-tree/types"
import { dropApi } from "@/node-tree/types"

export let createAbstract = (target: TreeNodeApi, selected: TreeNodeApi) => {
    
    let indexes = {
        target: target.paths.index,
        selected: selected.paths.index
    }

    let targetContainsSelected = () => {
        if(
            !target 
            || !target.parent 
            || !selected
        ) return false
        if( target.paths.full.includes(selected.paths.full) ) return true
        return false
    }
    let hasSameParent = () => {
        if(!selected.parent || !target.parent) return;
        return selected.parent.paths.full === target.parent.paths.full
    }

    let isAdjacent = () => {
        return (index: number) => {
            if( hasSameParent() ){
                if( indexes.selected + index == indexes.target) {
                    /**
                        if the item left of it is the target 
                        target then it can't move
                    */
                    return false;
                }
            }
        }
    }

    let sameIndex = target.paths.index == selected.paths.index

    return {
        indexes,
        sameParent: hasSameParent(),
        sameIndex,
        isAdjacent: isAdjacent(),
        targetContainsSelected: targetContainsSelected()
    }
}

export let createDropApi = ( target: TreeNodeApi, selected: TreeNodeApi ) : dropApi => {

    let { indexes, sameParent, isAdjacent } = createAbstract(target, selected)

    let dropAdjacent = (dropIndex:number) => {
        if(dropIndex < 0) dropIndex = 0
        let node = selected.node
        selected.remove.self()
        return target.parent.add.inside(node, dropIndex)
    }

    let before = () => {
        if( isAdjacent(1) ) return false
        return () => dropAdjacent(indexes.target-1)
    }
    
    let after = () => {
        if( isAdjacent(-1) ) return false
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
    )  return invalid

        // || targetContainsSelected(target, selected)
        // || hasSameParent(target, selected) && hasSameIndex(target, selected)
    return createDropApi(target, selected)
    
}
