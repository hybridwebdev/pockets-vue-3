import { $pockets } from "@/pockets"
import type { add, TreeNode, TreeNodeApi } from "@/node-tree/types"

export let useAdd = (api: TreeNodeApi) : add => {

    let inside = (node: TreeNode, index: number = 0) => {
        
        api.node.nodes = $pockets.utils.array.insert(api.node.nodes, index, node)
        
        return api.paths.path.concat(index)

    }
    let after = (node: TreeNode) => {
        return api.parent.add.inside(node, api.paths.index + 1)
    }
    let before = (node: TreeNode) => {
        return api.parent.add.inside(node, api.paths.index)
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