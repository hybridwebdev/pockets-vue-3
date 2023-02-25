import type { path, TreeNodeApiProps, TreeNodeApi, paths, createdApi } from "@/node-tree/types"

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

    let getPaths = (path: path) : paths => {

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

    let getNode = ($path: path | string) : TreeNodeApi => {
        
        let path = typeof $path === 'string' 
            /**
                If path is a string, convert all non root entries into numbers
            */
            ? $path.split('.').map(x => x == 'root' ? 'root' : Number(x) )  
            : $path

        let paths = getPaths(path)

        let parent = computed( () => {
            if(!paths.parent) return false
            return getNode(paths.parent.path)
        } )
        
        let node = computed(() => $pockets.utils.object.get( props, paths.joined, false) )

        let hasNodes = computed( () => Array.isArray(api.node?.nodes ) )

        let getChild = (index: number) => getNode(path.concat(index) )

        let editFields = computed(() => useEditFields(api) )
        let schema = computed(() => useSchema(api))

        let api = reactive({
            node,
            parent,
            hasNodes,
            editor,
            getChild,
            paths,
            editFields,
            getNode,
            schema,
        })
    
        api.add = useAdd(api)
        api.remove = useRemove(api)
        api.clone = useClone(api)
        api.replace = useReplace(api)
        api.move = useMove(api)
        
        useCrud(api)

        return api

    }

    return {
        getNode,
        saveTree
    }
    
}
