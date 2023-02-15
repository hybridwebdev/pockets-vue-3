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
        
    api.initialize = async () => {
        let r = await call(api.node)
        console.log(r)
    }
    
    
}
