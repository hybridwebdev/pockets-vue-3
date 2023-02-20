import { $pockets } from "@/pockets"
import type { move, TreeNodeApi } from "@/node-tree/types"

export let useMove = (api:TreeNodeApi) : move => {
    
    let self = (to: number) => api.parent.move.child(to, api.paths.index)
    
    let child = (to: number, from: number) => {
        api.node.nodes = $pockets.utils.array.move(api.node.nodes, to, from)
        return api.paths.path.concat(to)
    }
    let move: move = {
        self,
        child
    }
   
    return move
}
