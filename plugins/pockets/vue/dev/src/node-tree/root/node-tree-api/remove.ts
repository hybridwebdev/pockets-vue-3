import { $pockets } from "@/pockets"
import type { remove } from "./types"

export let useRemove = (api) => {
    let remove:remove = {
        self: false,
        node: false
    }
    let node = (index: number) => {
        api.node.nodes = $pockets.utils.array.omit(api.node.nodes, index)
        return []
    }
    let self = () => {
        return api.parent.remove.node(api.index)
    }
    if(api.parent) {
        remove.self = self
    }
    if(api.node.nodes) {
        remove.node = node
    }
    return remove
}