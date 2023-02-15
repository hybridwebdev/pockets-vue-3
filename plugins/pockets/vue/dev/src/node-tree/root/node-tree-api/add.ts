import { $pockets } from "@/pockets"
import type { add, TreeNode, TreeNodeApi } from "./types"

export let useAdd = (api: TreeNodeApi) : add => {

    let inside = (node: TreeNode, index: number = 0) => {
        api.node.nodes = $pockets.utils.array.insert(api.node.nodes, index, node)
        return []
    }
    let after = (node: TreeNode) => {
        return api.parent.add.inside(node, api.index + 1)
    }
    let before = (node: TreeNode) => {
        return api.parent.add.inside(node, api.index)
    }

    let add:add = {
        inside,
        before,
        after
    }

    if(!api.parent) {
        Object.assign(add, { before: false, after: false } )
    }
    if(!api.hasNodes ) {
        add.inside = false
    }

    return add

}