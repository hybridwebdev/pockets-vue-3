import type { TreeNodeApiProps, createdApi, TreeNodeProxied, TreeNodeApi } from "@/node-tree/types"

import { reactive, computed } from "vue"
import { $pockets } from "@/pockets"

import { useAdd } from "./add"
import { useRemove } from "./remove"
import { useClone } from "./clone"
import { useReplace } from "./replace"
import { useMove } from "./move"

import { useSchema } from './schema'
import { useEditFields } from "./edit-fields"

import { useInitializer, useHydrater } from "./crud"
import { editor } from "@/node-tree/editor"

export let createTreeApi = (props:TreeNodeApiProps) : createdApi => {
        
    let getNodeApi = (node: TreeNodeProxied) : TreeNodeApi => {

        let paths = computed(() => {
            let sourcePath = [ props.source.metaKey, props.source.type, props.source.ID ].join('.')
            let path =  node.__getPath
            let index =  parseInt( path.split('.').slice(-1)[0] )
            return {
                full: [ sourcePath, path] .join('.'),
                path,
                index,
            }
        })

        let getParent = (node) => {
            let parent = node.__getParent(2)
            if(parent) {
                return getNodeApi(parent)
            }
            return false
        }
        
        let parent = computed( () => getParent(node)  )

        let hasNodes = computed(() => Array.isArray(api.node?.nodes) )

        let getChild = (index: number) => {
            if(!api.node.nodes) return;
            return getNodeApi( api.node.nodes[index] as TreeNodeProxied)
        }

        let branch = computed( () => {
            
            let initial: Array<TreeNodeApi> = [];

            /**
                As the reducer is traversing from the source node upward,
                the resutl must be reversed so that they are in the correct order
                from top to bottom.
            */
            
            return api.paths.path.split('.nodes.').reduce((acc, _, index) => {
                acc.push( getNodeApi( api.node.__getParent( index  * 2 ) ) )
                return acc;
            }, initial ).reverse() 

        } )

        let api:TreeNodeApi = reactive( {
            
            branch,
            paths,
            
            getNodeApi,
            getChild,

            node,
            hasNodes,
            parent,

            editor,
            editFields: computed( () => useEditFields(api) ),
            schema:     computed( () => useSchema(api) ),

            add:        computed( () => useAdd(api) ),
            remove:     computed( () => useRemove(api) ),
            clone:      computed( () => useClone(api) ),
            replace:    computed( () => useReplace(api) ),
            move:       computed( () => useMove(api) ),

            initialize: computed( () => useInitializer(api) ),
            hydrate:    computed( () => useHydrater(api) )
            
        } )
        
        return api

    }
    
    let saveTree = async () => await $pockets.crud('node-tree/root').init(props.source).update(props.root)

    return {
        saveTree,
        getNodeApi,
    }
    
}
