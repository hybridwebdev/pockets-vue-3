import type { path, TreeNodeApiProps, TreeNodeApi, paths, createdApi, TreeNode } from "@/node-tree/types"

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
        
    let saveTree = async () => {
        return await $pockets.crud('node-tree/root').init(props.source).update(props.root)
    }

    let getPaths = ($path: path | string) : paths => {

        let path = typeof $path === 'string' 
            /**
                If path is a string, convert all non root entries into numbers
            */
            ? $path.split('.').map(x => x == 'root' ? 'root' : Number(x) )  
            : $path

        let sourcePath = [props.source.type, props.source.metaKey, props.source.ID].join('.')

        let paths: paths = {
            index: path.slice(-1)[0] as number,
            path,
            parent: false,
            joined: path.join('.nodes.'),
            full: '',
        }

        paths.full = [sourcePath, paths.joined].join('.')
        
        let parentPath = path.slice(0, -1)

        if(parentPath.length != 0) {
            paths.parent = getPaths(parentPath)
        }

        return paths

    }

    let getNodeRaw = (path: paths['joined']) : TreeNode => $pockets.utils.object.get( props, path, false)

    let getNode = (path: path | string) : TreeNodeApi => {
        
        let paths = getPaths(path)

        let parent = computed( () => {
            if(!paths.parent) return false
            return getNode(paths.parent.path)
        } )
        
        let node = computed( () => getNodeRaw(paths.joined) )

        let hasNodes = computed( () => Array.isArray(api.node?.nodes ) )

        let getChild = (index: number) => getNode(paths.path.concat(index) )

        let api = reactive( {
            node,
            parent,
            hasNodes,
            getChild,
            getNode,
            getNodeRaw,
            paths,

            editor,
            editFields: computed( () => useEditFields(api) ),
            schema:     computed( () => useSchema(api) ),
            add:        computed( () => useAdd(api) ),
            remove:     computed( () => useRemove(api) ),
            clone:      computed( () => useClone(api) ),
            replace:    computed( () => useReplace(api) ),
            move:       computed( () => useMove(api) )
        } )
        
        useCrud(api)

        return api

    }

    return {
        getNode,
        saveTree,
        getNodeRaw
    }
    
}
