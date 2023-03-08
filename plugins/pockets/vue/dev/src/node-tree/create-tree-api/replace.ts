import { TreeNodeApi, replace, TreeNode } from "@/node-tree/types";
import { $pockets } from "@/pockets"

export let useReplace = (api: TreeNodeApi) : replace => {
    let replace:replace = {
        child(index: number, node: TreeNode){
            $pockets.utils.object.set(api.node.nodes, index, node)
        },
        self: (node: TreeNode) => {
            if(!api.parent || !api.parent.replace.child) return;
            api.parent.replace.child(api.paths.index, node)
        }
    }
    if(!api.parent) {
        replace.self = false
    }
    if(!api.hasNodes) {
        replace.child = false
    }
    return replace
}