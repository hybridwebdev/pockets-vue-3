import { $pockets } from "@/pockets"
import type { clone, TreeNodeApi } from "@/node-tree/types"

export let useClone = (api:TreeNodeApi) : clone => {
    
    let self = () => api.parent.clone.child(api.paths.index)
    
    let child = (index: number) => {
        let child = api.getChild(index)
        if(child.node) {
            let targetIndex = index+1
            api.add.inside( $pockets.utils.object.clone( child.node ), targetIndex )
            if(api.node.nodes) {
                return api.node.nodes[targetIndex]  
            }
        }
        return false
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
