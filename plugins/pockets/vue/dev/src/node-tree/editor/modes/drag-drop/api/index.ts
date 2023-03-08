import type { TreeNodeApi, TreeNode } from "@/node-tree/types"
import { dropApi } from "@/node-tree/types"

import { $pockets } from "@/pockets"

type TreeNodePlaceHolder = TreeNode & {
    TreeNodePlaceHolder?: string
} 

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

export let createDragDropApi = ( 
    target: TreeNodeApi, 
    selected: TreeNodeApi, 
    /**
        If removeSelected is true, it will remove the selected node. Otherwise it will copy the node.
    */
    removeSelected: boolean 
) : dropApi => {

    let { indexes, isAdjacent } = createAbstract(target, selected)
    
    let dropInside = (dropIndex: number) => {
        return () => {
            /**
                1 - Copy node and place in new location
            */
            let node = $pockets.utils.object.clone(selected.node)
            target.add.inside(node, dropIndex) 
            /**
                2 - Get reference to node in its new location
            */
            let droppedNode = target.getChild(dropIndex)
            /**
                3 - Remove selected from existing location. 
                    then return new instance
            */
            if(removeSelected) {
                selected.remove.self()
            }
            
            return droppedNode

        }
    }

    let dropAdjacent = (dropIndex: number) => {
        return () => {
            if(!target.parent) return;
            /**
                1 - Copy node and place in new location
            */
            let node = $pockets.utils.object.clone(selected.node)
            target.parent.add.inside(node, dropIndex) 
            /**
                2 - Get reference to node in its new location
            */
            let droppedNode = target.parent.getChild(dropIndex)
            /**
                3 - Remove selected from existing location. 
                    then return new instance
            */
            if(removeSelected) {
                selected.remove.self()
            }
            
            return droppedNode

        }
    }

    let before = () => {
        if( !target.parent || isAdjacent(1) ) return false
        return dropAdjacent( indexes.target )
    }
    
    let after = () => {
        if( !target.parent || isAdjacent(-1) ) return false
        return dropAdjacent( indexes.target+1 )
    }

    let inside = () => {
        if(!target.node.nodes || target.node.nodes.length > 0) return false;
        return dropInside(0)
    }

    return {
        before: before(),
        after: after(),
        inside: inside(),
    }

}
 
export let dragDrop = ( 
    target: TreeNodeApi | false, 
    selected: false | TreeNodeApi,
    removeSelected: boolean = false
) : dropApi => {
    
    let invalid = {
        inside: false,
        before: false,
        after: false,
    }

    if(
            !target 
            || !target.parent 
        ||
            !selected  
            || !selected.parent
    )  return invalid

    let { targetContainsSelected, sameParent, sameIndex } = createAbstract(target, selected)

    if( targetContainsSelected || sameParent && sameIndex ) {
        return invalid
    }

    return createDragDropApi(target, selected, removeSelected)
    
}
