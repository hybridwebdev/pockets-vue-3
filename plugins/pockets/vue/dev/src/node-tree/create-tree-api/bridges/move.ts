import type { TreeNodeApi, TreeNode } from "@/node-tree/types"
import { dropApi } from "@/node-tree/types"
import { createAbstract } from "./create-abstract"
import { $pockets } from "@/pockets"

type TreeNodePlaceHolder = TreeNode & {
    TreeNodePlaceHolder?: string
} 

let placeHoldSelected = (selected: TreeNodeApi) => {
    let node: TreeNodePlaceHolder = selected.node
    node.TreeNodePlaceHolder = 'remove-me'
    let selectedParent = selected.refs.parent
    return {
        remove(){
            selectedParent.nodes = selectedParent.nodes?.filter( (e) => e.TreeNodePlaceHolder != 'remove-me' )
        }
    }
}

export let createDropApi = ( target: TreeNodeApi, selected: TreeNodeApi ) : dropApi => {

    let { indexes, isAdjacent } = createAbstract(target, selected)

    let dropInside = () => {
        let dropIndex = 0
        let node = $pockets.utils.object.clone(selected.node)
        let placeHolder = placeHoldSelected(selected)
        target.add.inside(node, dropIndex) 
        placeHolder.remove()
        return target.paths.path.concat(dropIndex)
    }
    
    let dropAdjacent = (dropIndex: number) => {
        return () => {
            let node = $pockets.utils.object.clone(selected.node)
            let placeHolder = placeHoldSelected(selected)
            target.parent.add.inside(node, dropIndex) 
            placeHolder.remove()
            return target.parent.paths.path.concat(dropIndex)
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
        return dropInside
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
