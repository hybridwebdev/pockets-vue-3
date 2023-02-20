import { $pockets } from "@/pockets"
import type { move, TreeNodeApi } from "@/node-tree/types"

export let useMove = (api:TreeNodeApi) : move => {
    
    let self = () => {
        return []
    }
    
    let child = (from: number, to: number) => {
        api.node.nodes = $pockets.utils.array.move(api.node.nodes, from, to)
        return api.paths.path.concat(to)
    }
    let move: move = {
        self,
        child
    }
   
    return move
}
