
import type { move, TreeNodeApi } from "@/node-tree/types"

export let useMove = (api:TreeNodeApi) : move => {
    
    let self = (to: number) => {
        if(!api.parent || !api.parent.move.child) return false;
        return api.parent.move.child(api.paths.index, to )
    }
    
    let child = (from: number, to: number) : false => {
        if(!api.parent || !api.parent.node.nodes) return false;
        let element = api.parent.node.nodes[from];
        api.parent.node.nodes.splice(from, 1);
        api.parent.node.nodes.splice(to, 0, element);
        return false
    }


    let move: move = {
        self,
        child,
        left(){
            if(!api.move.child) return false;
            return api.move.child(api.paths.index, api.paths.index-1)
        },
        right(){
            if(!api.move.child) return false;
            return api.move.child(api.paths.index, api.paths.index+1)
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
