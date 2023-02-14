import { $pockets } from "@/pockets"
import type { add } from "./types"

export let useAdd = (api) : add => {

    let add:add = {
        inside: false,
        before: false,
        after: false
    }

    let inside = (node: any, index: number = 0) => {
        api.node.nodes = $pockets.utils.array.insert(api.node.nodes, index, node)
        return []
    }
    let after = (node: any) => {
        return api.parent.add.inside(node, api.index + 1)
    }
    let before = (node: any) => {
        return api.parent.add.inside(node, api.index)
    }

    if(api.parent) {
        Object.assign(add, { before, after } )
    }
    if(api.hasNodes ) {
        add.inside = inside
    }

    return add

}