import { TreeNodeApi, replace, TreeNode } from "./types";
import { $pockets } from "@/pockets"

export let useReplace = (api: TreeNodeApi) : replace => {
    let replace:replace = {
        child(index: number, node: TreeNode){
            $pockets.utils.object.set(api.node.nodes, index, node)
        },
        self(node: TreeNode){
            api.parent.replace.child(api.index, node)
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