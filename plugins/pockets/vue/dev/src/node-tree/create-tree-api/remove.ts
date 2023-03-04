import { $pockets } from "@/pockets"
import type { remove, TreeNodeApi } from "@/node-tree/types"

export let useRemove = (api:TreeNodeApi) : remove => {
   
    let child = (index: number) => []

    let self = () => {
        console.log("remove", api)
        // api.parent.node.nodes = $pockets.utils.array.omit(api.parent.node.nodes, 0)
        return []
    }

    let remove:remove = {
        self,
        child
    }
    if(!api.parent) {
        remove.self = false
    }
    
    return remove
}