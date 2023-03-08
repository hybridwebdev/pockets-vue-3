import { $pockets } from "@/pockets"
import type { move, TreeNodeApi } from "@/node-tree/types"

export let useMove = (api:TreeNodeApi) : move => {
    
    let self = (to: number) => {
        if(!api.parent || !api.parent.move.child) return false;
        return api.parent.move.child(api.paths.index, to )
    }
    
    let child = (from: number, to: number) : false => {
        console.log("i need to refactor this")
        // api.node.nodes = $pockets.utils.array.move(api.node.nodes, from, to)
        return false
    }
    let move: move = {
        self,
        child
    }
   
    return move
}
