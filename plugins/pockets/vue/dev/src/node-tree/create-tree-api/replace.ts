import { TreeNodeApi, replace, TreeNode } from "@/node-tree/types";
import { $pockets } from "@/pockets"

export let useReplace = (api: TreeNodeApi) : replace => {
    let replace:replace = {
        child(index: number, node: TreeNode){
            $pockets.utils.object.set(api.node.nodes, index, node)
            return api.parent.getChild(index)
        },
        self(node: TreeNode){
            return api.parent.replace.child(api.paths.index, node)
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