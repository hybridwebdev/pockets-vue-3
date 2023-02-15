import { $pockets } from "@/pockets"
import { TreeNodeApi } from "./types"
export let useCrud = (api : TreeNodeApi) => {
 
    let createFetcher = (read) => {
        
        return async (index: number) => {
            
            let child = api.getChild(index)
            if(!child.node) return;

            try {
                let newNode = await $pockets.crud('node-tree/node')
                    .init(child.node)
                    .read(read)
                
                child.replace.self(newNode)

            } catch(e) {
            }

            return []
        }

    }
    
    let initializer = createFetcher(['initialize:<='])

    let initialize = {
        self: async () => {
            return api.parent.initialize.child(api.index)
        },
        child: async (index: number) => {
            return initializer(index)
        }
    }    

    api.initialize = initialize

}
