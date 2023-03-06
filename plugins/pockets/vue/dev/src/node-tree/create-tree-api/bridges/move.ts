import type { TreeNodeApi, TreeNode } from "@/node-tree/types"
import { dropApi } from "@/node-tree/types"
import { createAbstract } from "./create-abstract"
import { $pockets } from "@/pockets"

type TreeNodePlaceHolder = TreeNode & {
    TreeNodePlaceHolder?: string
} 

export let createDropApi = ( target: TreeNodeApi, selected: TreeNodeApi ) : dropApi => {

    let { indexes, isAdjacent, sameParent } = createAbstract(target, selected)

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
            selected.parent.remove.child(selected.paths.index)
            
            return droppedNode

        }
    }

    let dropAdjacent = (dropIndex: number) => {
        return () => {
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
            selected.parent.remove.child(selected.paths.index)
            
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
        if(!target.node.nodes) return false;
        return dropInside(0)
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

    let { targetContainsSelected, sameParent, sameIndex } = createAbstract(target, selected)

    if(
        targetContainsSelected 
        || sameParent && sameIndex
    ) return invalid

    return createDropApi(target, selected)
    
}
