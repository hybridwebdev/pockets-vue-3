import type { TreeNodeApiProps, createdApi, TreeNodeProxied, TreeNodeApi, TreeNode } from "@/node-tree/types"

import { reactive, computed } from "vue"
import { $pockets } from "@/pockets"

import { useAdd } from "./add"
import { useRemove } from "./remove"
import { useClone } from "./clone"
import { useReplace } from "./replace"
import { useMove } from "./move"

import { useSchema } from './schema'
import { useEditFields } from "./edit-fields"
import { useCrud } from "./crud"

import { editor } from "@/node-tree/editor"

export let createTreeApi = (props:TreeNodeApiProps) : createdApi => {
        
    let getNodeApi = (node: TreeNodeProxied) : TreeNodeApi => {
        
        let sourcePath = [ props.source.metaKey, props.source.type, props.source.ID ].join('.')

        let path = computed(() => node.__getPath)

        let paths = computed(() => {
            return {
                full: [sourcePath, path.value].join('.'),
                path: path.value,
                index: parseInt( api.node.__getPath.split('.').slice(-1)[0] )
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

        let getChild = (index: number) => getNodeApi( api.node.nodes[index] )

        let parents = computed(() => {
            console.log(api.paths.path.split('.nodes.'))
        })

        let api = reactive({

            parents,

            paths,
            getNodeApi,

            hasNodes,
            node,
            parent,
            getChild,

            editor,
            editFields: computed( () => useEditFields(api) ),
            schema:     computed( () => useSchema(api) ),

            add:        computed( () => useAdd(api) ),
            remove:     computed( () => useRemove(api) ),
            clone:      computed( () => useClone(api) ),

            replace:    computed( () => useReplace(api) ),
            

            // move:       computed( () => useMove(api) ),
            
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
