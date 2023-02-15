import { $pockets } from "@/pockets"
import type { remove, TreeNodeApi } from "./types"

export let useRemove = (api:TreeNodeApi) : remove => {
   
    let node = (index: number) => {
        api.node.nodes = $pockets.utils.array.omit(api.node.nodes, index)
        return []
    }
    let self = () => {
        return api.parent.remove.node(api.index)
    }
    let remove:remove = {
        self,
        node
    }
    if(!api.parent) {
        remove.self = self
    }
    if(!api.node.nodes) {
        remove.node = node
    }
    return remove
}