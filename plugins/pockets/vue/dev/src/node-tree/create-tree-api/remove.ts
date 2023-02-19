import { $pockets } from "@/pockets"
import type { remove, TreeNodeApi } from "@/node-tree/types"

export let useRemove = (api:TreeNodeApi) : remove => {
   
    let child = (index: number) => {

        let node = $pockets.utils.object.get(api, api.nodePath(api.paths.path) )
        node.nodes = $pockets.utils.array.omit(node.nodes, index)
        return []
    }
    let self = () => {
        return api.parent.remove.child(api.paths.index)
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