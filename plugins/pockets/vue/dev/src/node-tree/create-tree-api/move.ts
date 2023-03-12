
import type { move, TreeNodeApi } from "@/node-tree/types"

export let useMove = (api:TreeNodeApi) : move => {
    
    let self = (to: number) => {
        if(!api.parent || !api.parent.move.child) return false;
        return api.parent.move.child(api.paths.index, to )
    }
    
    let child = (from: number, to: number) : false => {
        return false
    }


    let move: move = {
        self,
        child,
        left(){
            return false
        },
        right(){
            return false
        }
    }
    if(api.paths.index==0) {
        move.left = false;
    }
    if(!api.parent || !api.parent.node.nodes || api.paths.index == api.parent.node.nodes.length -1) {
        move.right = false;
    }
    return move
}
