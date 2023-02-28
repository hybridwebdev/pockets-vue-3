import type { TreeNodeApi } from "@/node-tree/types"
import { dropApi } from "@/node-tree/types"
import { createAbstract } from "./create-abstract"
import { $pockets } from "@/pockets"
//@ts-nocheck
// target.parent.node.nodes = $pockets.utils.array.insert(target.parent.node.nodes, dropIndex, node)
export let createDropApi = ( target: TreeNodeApi, selected: TreeNodeApi ) : dropApi => {

    let dropper = (dropIndex: number) => {
        return () => {
            let node = $pockets.utils.object.clone(selected.node)
            selected.node.hash = 'remove-me'
            let selectedParent = selected.refs.parent
            let remover = (e) => e.hash!='remove-me'
            target.parent.refs.node.nodes = $pockets.utils.array.insert(target.parent.refs.node.nodes, dropIndex, node)
            selectedParent.nodes = selectedParent.nodes?.filter(remover)
            return []
        }
    }
    let { indexes, sameParent, isAdjacent } = createAbstract(target, selected)

    let dropAdjacent = (dropIndex:number) => {

        if(dropIndex < 0) dropIndex = 0
        let node = selected.node
        selected.remove.self()
        return target.parent.add.inside(node, dropIndex)
    }

    let before = () => {
        if( !target.parent || isAdjacent(1) ) return false
        
        return dropper(indexes.target)
    }
    
    let after = () => {
        if( !target.parent || isAdjacent(-1) ) return false

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

    let { targetContainsSelected, sameParent, sameIndex } = createAbstract(target, selected)

    if(
        targetContainsSelected 
        || sameParent && sameIndex
    ) return invalid

    return createDropApi(target, selected)
    
}
