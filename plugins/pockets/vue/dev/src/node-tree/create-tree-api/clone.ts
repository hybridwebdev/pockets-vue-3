import { $pockets } from "@/pockets"
import type { clone, TreeNodeApi } from "@/node-tree/types"

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export let useClone = (api:TreeNodeApi) : clone => {
    
    let self = () => api.parent.clone.child(api.index)
    
    let child = (index: number) => {
        let child = api.getChild(index)
        if(child.node) {
            let cloned = $pockets.utils.object.clone( child.node )
            cloned.hash = makeid(20)
            api.add.inside(cloned , index )
            if(api.node.nodes) {
                return api.node.nodes[index]  
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
