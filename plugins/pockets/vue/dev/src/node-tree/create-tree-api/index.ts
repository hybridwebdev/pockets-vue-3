import type { TreeNodeApiProps, createdApi, TreeNodeProxied, TreeNodeApi } from "@/node-tree/types"

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
        
    let getNodeApi = (node: TreeNodeProxied) : TreeNodeApi => {

        let parent = computed( () => {
            let nodes = node.__getParent()
            if(!nodes) return false
            let parent = nodes.__getParent()
            if(!parent) return false
            return getNodeApi(parent)
        } )

        let api = reactive({

            path: node.__getPath,
            index: computed(() => api.node.__getPath.split('.').slice(-1)[0]), 

            hasNodes: computed(() => Array.isArray(api.node?.nodes) ),
            node,
            parent,

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
    
    let saveTree = async () => await $pockets.crud('node-tree/root').init(props.source).update(props.root)

    return {
        saveTree,
        getNodeApi,
    }
    
}
