import { $pockets } from "@/pockets"
import { TreeNodeApi } from "./types"
export let useCrud = (api : TreeNodeApi) => {

    let initialize = async () => {
        try {
            let res = await $pockets.crud('node-tree/node').init(api.node).read(['initialize:<='])
            api.node = res
        } catch(e) {

        }
    }
    
    return {
        initialize
    }
}
