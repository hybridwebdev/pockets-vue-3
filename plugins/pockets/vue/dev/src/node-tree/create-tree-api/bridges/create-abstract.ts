import type { TreeNodeApi } from "@/node-tree/types"

export let createAbstract = (target: TreeNodeApi, selected: TreeNodeApi) => {
    
    let indexes = {
        target: target.paths.index,
        selected: selected.paths.index
    }

    let targetContainsSelected = () : boolean => {
        if(
            !target 
            || !target.parent 
            || !selected
        ) return false
        if( target.paths.full.includes(selected.paths.full) ) return true
        return false
    }
    let sameParent = () : boolean => {
        if(!selected.parent || !target.parent) return false;
        return selected.parent.paths.full === target.parent.paths.full
    }

    let isAdjacent = (index: number) : boolean => {
        if( sameParent() ){
            if( indexes.selected + index == indexes.target) {
                /**
                    if the item left of it is the target 
                    target then it can't move
                */
                return true
            }
        }
        return false;
    }

    let sameIndex = target.paths.index == selected.paths.index

    return {
        indexes,
        sameParent: sameParent(),
        sameIndex,
        isAdjacent,
        targetContainsSelected: targetContainsSelected()
    }
}
