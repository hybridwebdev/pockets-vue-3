import type { path, TreeNodeApiProps, TreeNodeApi, paths, createdApi, TreeNode } from "@/node-tree/types"
import ObservableSlim from "observable-slim"
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




let getNodeApi = (node: any) => {
    let api = reactive({
        path: computed(() => {
            // console.log(node)
            if(!node.__getParent) return 'ass';
            return 'der'
            // if(!node.nodes) return;
            // console.log('node.nodes.__getPath')
            // return node.nodes.__getParent()
        }),
    } )
    return api
}
















export let createApi = ($props:TreeNodeApiProps) : createdApi => {

    let props:any = ObservableSlim.create($props, false, (change) => {
        console.log(change)
    })     
    
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

    

    let getNode = (path: path | string) : TreeNodeApi => {
        
        let paths  = getPaths(path)

        let api = reactive( {
            refs: {
                get node() {
                    return $pockets.utils.object.get( props, paths.joined, false)
                },
                get parent(){
                    return $pockets.utils.object.get( props, api.paths.parent.joined, false)
                }
            },
            node: computed( () => api.refs.node ),
            parent: computed( () => {
                if(!api.paths.parent) return false
                return api.getNode(api.paths.parent.path)
            } ),
            hasNodes: computed( () => Array.isArray(api.node?.nodes ) ),
            getChild: (index: number) => getNode(api.paths.path.concat(index) ),
            getNode,
            paths,

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

    return {
        getNode,
        saveTree,
        getNodeApi,
        root: props
    }
    
}
