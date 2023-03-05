import { $pockets } from "@/pockets"
import type { remove, TreeNodeApi } from "@/node-tree/types"

export let useRemove = (api:any) : remove => {
   
    let child = (index: number) => api.node.nodes.splice(index, 1)

    let self = () => {
        api.parent.remove.child(api.index)
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