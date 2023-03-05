import type { remove, TreeNodeApi } from "@/node-tree/types"

export let useRemove = (api:TreeNodeApi) : remove => {
   
    let child = (index: number) => {
        if(api.node.nodes) {
            api.node.nodes.splice(index, 1)
        }
        return false
    }

    let self = () => {
        api.parent.remove.child(api.index)
        return false
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