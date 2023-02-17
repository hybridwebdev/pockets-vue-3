import { $pockets } from "@/pockets"
import { TreeNodeApi, TreeNode } from "./types"
export let useCrud = (api : TreeNodeApi) => {
 
    let createFetcher = (read: Array<string>) => {
        
        return async (index: number) => {
            
            let child = api.getChild(index)
            if(!child.node) return;

            try {
                let newNode:TreeNode = await $pockets.crud('node-tree/node')
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
        self: async () => api.parent.initialize.child(api.paths.index),
        child: async (index: number) => initializer(index)
    }    

    api.initialize = initialize

}
