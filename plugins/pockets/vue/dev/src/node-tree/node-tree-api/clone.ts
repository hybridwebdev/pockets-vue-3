import { $pockets } from "@/pockets"
import type { clone, TreeNodeApi } from "@/node-tree/types"

export let useClone = (api:TreeNodeApi) : clone => {
    
    let self = () => {
        return api.parent.clone.child(api.paths.index)
    }
    let child = (index: number) => {
        let child = api.getChild(index)
        if(child.node) {
            api.add.inside( $pockets.utils.object.clone( child.node ), index )
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
