import { reactive, computed } from "vue"
import { $pockets } from "@/pockets"

import { useAdd } from "./add"
import { useRemove } from "./remove"
import { useClone } from "./clone"
import { useSchema } from './schema'
import { editor } from "@/node-tree/editor"

import type { path } from "./types"
import { useEditFields } from "./edit-fields"

let createApi = (props) => {
    
    let getNode = (path: path ) => {
    
        let $path = path.join('.nodes.')
        let index = path.slice(-1)[0]

        let node = $pockets.utils.object.get( props, $path)

        if(typeof node == 'undefined') {
            /**
                No node found, thus cannot continue.
            */
            return
        }

        let parent = computed( () => {
            let parentPath = path.slice(0, -1)
            if(parentPath.length == 0) return false
            return getNode(parentPath)
        } )

        let hasNodes = computed( () => Array.isArray(api.node?.nodes ) )

        let api = reactive({
            node,
            parent,
            index,
            hasNodes,
            editor
        })
    
        api.add = useAdd(api)
        api.remove = useRemove(api)
        api.clone = useClone(api)

        api.schema = useSchema(api)
        api.editFields = useEditFields(api)

        return api

    }

    return {
        getNode
    }
}
export let api = (props) => {

    let api = createApi(props)

    let el = api.getNode(['root', 0])

    if(el.add.inside) {

        let add = {
            el: "img",
            props: {
                src: "https://via.placeholder.com/150"
            },
            schema: "image",
            data: {
                source: "remote",
                ID: false
            }
        }
        el.add.inside(add)
        el.clone.node(0)
        el.clone.node(0)
        el.remove.node(0)
        
        console.log(el)
    }
    
    let el2 = api.getNode(['root', 0, 3])
    // if(el2?.clone.self) {
    //     console.log(el2.schema)
    //     el2.clone.self()
    // }

    
}