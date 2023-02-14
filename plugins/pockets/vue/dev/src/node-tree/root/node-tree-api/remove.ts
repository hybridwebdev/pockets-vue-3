import { $pockets } from "@/pockets"
import type { path } from "./types"

export type useRemove = {
    self: false | (() => void )
    node: false | ((index: number) => void )
}

export let us
export let useRemove = (api) => {
    let remove:useRemove = {
        self: false,
        node: false
    }
    let node = (index: number) => {
        api.node.nodes = $pockets.utils.array.omit(api.node.nodes, index)
    }
    let self = () => {
        api.parent.remove.node(api.index)
    }
    if(api.parent) {
        remove.self = self
    }
    if(api.node.nodes) {
        remove.node = node
    }
    return remove
}