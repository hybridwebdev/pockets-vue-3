import { TreeNodeApi } from "./types";

export let useReplace = (api: TreeNodeApi) =>{
    let replace = {
        child(index: number, node){
            api.node.nodes[index] = node
        },
        self(node){
            api.parent.replace.child(api.index, node)
        }
    }
    return replace
}