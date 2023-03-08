import { $pockets } from "@/pockets"
import { TreeNodeApi, TreeNode, nodeHydrate } from "@/node-tree/types"
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

                return api.getChild(index)

            } catch(e) {

            }

        }

    }
    
    let useInitializer = () => {

        let initializer = createFetcher(['initialize:<='])
        let initialize:nodeHydrate = {
            self: async () => {
                if(!api.parent || !api.parent.initialize.child) return;
                return api.parent.initialize.child(api.paths.index)
            },
            child: async (index: number) => initializer(index)
        }    
        return initialize
    }
    
    let hydrater = createFetcher(['hydrate:<='])


    let hydrate:nodeHydrate = {
        self: async () => {
            if(!api.parent || !api.parent.hydrate.child) return;
            return api.parent.hydrate.child(api.paths.index)
        },
        child: async (index: number) => hydrater(index),
        active: async() => {
            if(!api.hydrate.self) return;
            /**
                Active is meant to be used within an editor context only. 
            */
            let node = await api.hydrate.self()
            if(node ) api.editor.active = node
        }
    }   


    

    if(!api.hasNodes) {
        hydrate.child = false
    }

    if(!api.parent) {
        hydrate.self = false
    }
    api.hydrate = hydrate
    return {
        useInitializer
    }
}
