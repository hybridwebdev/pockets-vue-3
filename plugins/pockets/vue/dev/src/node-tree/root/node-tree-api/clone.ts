import { $pockets } from "@/pockets"
import type { clone } from "./types"

export let useClone = (api) => {
    let clone: clone = {
        self: false,
        node: false
    }
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
    if(api.hasNodes){
        clone.node = node
    }
    if(api.parent) {
        clone.self = self
    }
    return clone
}
