import { $pockets } from "@/pockets"
import type { clone, TreeNodeApi } from "./types"

export let useClone = (api:TreeNodeApi) : clone => {
    
    let self = () => {
        return api.parent.clone.child(api.index)
    }
    let child = (index: number) => {
        let node = api.node.nodes[index]
        if(node) {
            api.add.inside( $pockets.utils.object.clone( node ), index )
        }
        return []
    }
    let clone: clone = {
        self,
        child
    }
    if(!api.hasNodes){
        clone.child = false
    }
    if(!api.parent) {
        clone.self = false
    }
    return clone
}
