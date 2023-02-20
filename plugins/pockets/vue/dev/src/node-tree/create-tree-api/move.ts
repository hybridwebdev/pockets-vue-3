import { $pockets } from "@/pockets"
import type { move, TreeNodeApi } from "@/node-tree/types"

export let useMove = (api:TreeNodeApi) : move => {
    
    let self = () => {
        return []
    }
    
    let child = (index: number) => {
        return []
        // let child = api.getChild(index)
        // if(child.node) {
        //     api.add.inside( $pockets.utils.object.clone( child.node ), index )
        // }
        // return api.paths.path.concat(index + 1)
    }
    let move: move = {
        self,
        child
    }
   
    return move
}
