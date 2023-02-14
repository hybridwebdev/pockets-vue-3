import { reactive, computed } from "vue"
import { $pockets } from "@/pockets"
import { useAdd } from "./use-add"
import { useRemove } from "./use-remove"

type path = Array<string | number>


let useClone = (api) => {
    let clone = (index:number) => {
        // let targetNode = api.node?.nodes[index] 
        // if(!targetNode) return;
        // api.insert(index, $pockets.utils.object.clone( targetNode ) )
        // return path.concat(index)
    }
    return {
        clone
    }
}

let useCrud = (api) => {
    let initialize = async () => {
        try {
            let res = await $pockets.crud('node-tree/node').init(api.node).read(['initialize:<='])
            api.node = res
        } catch(e) {

        }
    }
}

let createApi = (props) => {
    
    let getNode = (path: path ) => {
    
        let $path = path.join('.nodes.')

        let index = path.slice(-1)[0]

        let node = computed( () => $pockets.utils.object.get( $path, props) )
        
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
            hasNodes
        })

        api.add = useAdd(api)
        api.remove = useRemove(api)
        api.clone = useClone(api)
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
        // el.add.inside(add)
        
    }

    
}