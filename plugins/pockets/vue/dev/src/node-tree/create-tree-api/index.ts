import type { TreeNodeApiProps, createdApi, TreeNodeProxied } from "@/node-tree/types"

import { reactive, computed } from "vue"
import { $pockets } from "@/pockets"

import { useAdd } from "./add"
import { useRemove } from "./remove"
import { useClone } from "./clone"
import { useReplace } from "./replace"

import { useSchema } from './schema'
import { useEditFields } from "./edit-fields"
import { useCrud } from "./crud"

import { editor } from "@/node-tree/editor"
import { useMove } from "./move"

export let createApi = (props:TreeNodeApiProps) : createdApi => {
        
    let getNodeApi = (node: TreeNodeProxied) => {
        let api = reactive({
            
            path: computed(() =>  node.__getPath ),
            index: computed(() => {
                if(!api.parent) return false
                return api.node.__getPath.split('.').slice(-1)[0]
            }),
            node,
            parent: computed( () => {
                let nodes = node.__getParent()
                if(!nodes) return false
                let parent = nodes.__getParent()
                if(!parent) return false
                return getNodeApi(parent)
            }),

            hasNodes: false,
            editor,
            editFields: computed( () => useEditFields(api) ),
            schema:     computed( () => useSchema(api) ),

            add:        computed( () => useAdd(api) ),
            remove:     computed( () => useRemove(api) ),
            clone:      computed( () => useClone(api) ),
            replace:    computed( () => useReplace(api) ),
            move:       computed( () => useMove(api) ),

        } )
        useCrud(api)
        return api
    }


    
    let saveTree = async () => {
        return await $pockets.crud('node-tree/root').init(props.source).update(props.root)
    }

    return {
        saveTree,
        getNodeApi,
    }
    
}
