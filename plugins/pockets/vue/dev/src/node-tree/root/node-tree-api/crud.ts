import { $pockets } from "@/pockets"
import { TreeNodeApi } from "./types"
export let useCrud = (api : TreeNodeApi) => {

    let createFetcher = (read) => {
        
        return async (index: number) => {
            
            let node = api.node.nodes[index]
            if(!node) return;

            try {
                let newNode = await $pockets.crud('node-tree/node')
                    .init(node)
                    .read(read)
                api.node.nodes[index] = newNode
            } catch(e) {
            }

            return []
        }

    }
    
    let initializer = createFetcher(['initialize:<='])
    let hydrater = createFetcher(['hydrate:<='])

    let initialize = {
        self: async () => {
            return api.parent.initialize.child(api.index)
        },
        child: async (index: number) => {
            return await initializer(index)
        }
    }    

    api.initialize = initialize
    api.initialize = initialize
}
