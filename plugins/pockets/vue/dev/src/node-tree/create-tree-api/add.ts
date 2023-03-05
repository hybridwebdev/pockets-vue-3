import { $pockets } from "@/pockets"
import type { add, TreeNode, TreeNodeApi } from "@/node-tree/types"

export let useAdd = (api: TreeNodeApi) : add => {

    let inside = (node: TreeNode, index: number = 0) => {
        if(api.node.nodes){
            api.node.nodes.splice( index, 0, node )
            console.log(node)
        }
        return []
    }

    let after = (node: TreeNode) => api.parent.add.inside(node, api.index + 1)

    let before = (node: TreeNode) => api.parent.add.inside(node, api.index)

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