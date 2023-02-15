import { $pockets } from "@/pockets"
import type { remove, TreeNodeApi } from "./types"

export let useRemove = (api:TreeNodeApi) : remove => {
   
    let child = (index: number) => {
        api.node.nodes = $pockets.utils.array.omit(api.node.nodes, index)
        return []
    }
    let self = () => {
        return api.parent.remove.child(api.index)
    }
    let remove:remove = {
        self,
        child
    }
    if(!api.parent) {
        remove.self = false
    }
    if(!api.node.nodes) {
        remove.child = false
    }
    return remove
}