import { $pockets } from "@/pockets"
import { TreeNodeApi } from "./types"
export let useCrud = (api : TreeNodeApi) => {

    let call = async (init, read = ['initialize:<='] ) => {
        try {
            return await $pockets.crud('node-tree/node')
                .init(init)
                .read(read)
        } catch(e) {
            return false
        }
    }


    let initializeSelf = async () => {
        api.parent.node.nodes[api.index] = await call(api.node)
    }
    
    let initialize = {
        self: initializeSelf,
    }    

    api.initialize = initialize
}
