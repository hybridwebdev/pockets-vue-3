import { $pockets } from "@/pockets"
import { TreeNodeApi, TreeNode } from "@/node-tree/types"
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

        }

    }
    
    type methods = {
        self: false | (() => Promise<any>)
        child: false | ((index: number) => Promise<any>)
    }
    
    let hydrater = createFetcher(['hydrate:<='])

    let initializer = createFetcher(['initialize:<='])

    let hydrate:methods = {
        self: async () => api.parent.hydrate.child(api.paths.index),
        child: async (index: number) => hydrater(index)
    }   

    let initialize:methods = {
        self: async () => api.parent.initialize.child(api.paths.index),
        child: async (index: number) => initializer(index)
    }    
    if(!api.hasNodes) {
        initialize.child = false
        hydrate.child = false
    }
    if(!api.parent) {
        initialize.self = false
        hydrate.self = false
    }
    api.hydrate = hydrate

    api.initialize = initialize

}
