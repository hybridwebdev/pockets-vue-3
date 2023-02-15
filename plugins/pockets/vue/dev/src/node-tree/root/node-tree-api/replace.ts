import { TreeNodeApi, replace } from "./types";

export let useReplace = (api: TreeNodeApi) : replace =>{
    let replace:replace = {
        child(index: number, node){
            api.node.nodes[index] = node
        },
        self(node){
            api.parent.replace.child(api.index, node)
        }
    }
    if(!api.hasNodes) {
        replace.child = false
    }
    return replace
}