import { $pockets } from "@/pockets"
import type { add, TreeNode, TreeNodeApi } from "@/node-tree/types"

export let useAdd = (api: TreeNodeApi) : add => {

    let inside = (node: TreeNode, index: number = 0) => {
        if(api.node.nodes){
            api.node.nodes.splice( index, 0, node )
            return api.node.nodes[index]
        }
        return false
    }

    let after = (node: TreeNode) => {
        if(!api.parent) return false;
        return api.parent.add.inside(node, api.paths.index + 1)
    }

    let before = (node: TreeNode) => {
        if(!api.parent) return false;
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