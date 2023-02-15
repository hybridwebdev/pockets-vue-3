import { $pockets } from "@/pockets"
import type { clone, TreeNodeApi } from "./types"

export let useClone = (api : TreeNodeApi) : clone => {
    
    let self = () => {
        return api.parent.clone.node(api.index)
    }
    let node = (index: number) => {
        let node = api.node.nodes[index]
        if(node) {
            api.add.inside( $pockets.utils.object.clone( node ), index )
        }
        return []
    }
    let clone: clone = {
        self,
        node
    }
    if(!api.hasNodes){
        clone.node = false
    }
    if(!api.parent) {
        clone.self = false
    }
    return clone
}
