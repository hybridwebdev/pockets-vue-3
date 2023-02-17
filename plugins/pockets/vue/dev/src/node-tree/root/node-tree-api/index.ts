import type { path, TreeNodeApiProps, TreeNodeApi, paths } from "./types"

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

let createApi = (props:TreeNodeApiProps) => {

    let getPaths = (path: path) : paths => {

        let sourcePath = [props.source.type, props.source.metaKey, props.source.ID].join('.')

        let paths: paths = {
            index: path.slice(-1)[0],
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

    let getNode = (path: path ) : TreeNodeApi => {
        
        let paths = getPaths(path)

        let node = $pockets.utils.object.get( props, paths.joined) ?? false

        let parent = computed( () => {
            if(!paths.parent) return false
            return getNode(paths.parent.path)
        } )

        let hasNodes = computed( () => Array.isArray(api.node?.nodes ) )

        let getChild = (index: number) => getNode(path.concat(index) )

        let api = reactive({
            node,
            parent,
            hasNodes,
            editor,
            getChild,
            paths
        })
    
        api.add = useAdd(api)
        api.remove = useRemove(api)
        api.clone = useClone(api)
        api.replace = useReplace(api)

        api.schema = useSchema(api)
        api.editFields = useEditFields(api)
        
        useCrud(api)

        return api

    }

    return {
        getNode
    }
}
export let api = (props) => {

    let api = createApi(props)

    let el = api.getNode(['root'])

    if(el.hasNodes) {

        el.add.inside({
            el: "div",
            schema: "post",
            props: {
                class: 'p-2'
            }
        })

        el.add.inside( {
            el: "img",
            props: {
                class: 'img-fluid',
                src: "https://via.placeholder.com/150"
            },
            schema: "image",
        }, 1)

        el.clone.child(1)
        el.clone.child(2)
        el.remove.child(2)
        
        el.initialize.child(0)

        el.getChild(1).clone.self()
    }
    

    console.log("Trying to get path that doesnt exist", api.getNode(['root', 0, 3]) )
    
    
}