import { editor } from "@/node-tree/editor"
import { inject, provide, computed, ref, reactive, toRef } from "vue"
import { useInject } from "@/node-tree/create-tree-api/injection-key"

export let setup2 = (props) => {
    let nodeApi = useInject()
    return nodeApi.getNodeApi(props)
}
export let setup = (t) => {
    let props = t.treeNode
    
    let newApi = setup2(props)

    let path = pathProvider('pockets/node-tree/path')(t)
    
    let nodeApi = useInject().getNode( path )

    let hovered = ref(false)

    let selected = computed( () =>  false )

    let active = computed( () => {
        
        if(!editor?.active ) return;
        if(editor?.active?.path == newApi.path) return true
    } )

    let classes = computed(() => {
        let {
            active,
            hovered,
            selected
        } = state
        return {
            hovered,
            active,
            "editor-show": editor.show,
            "selected": selected
        }
    })
    
    let hiearchy = nodeHiearchy(nodeApi)

    let toolTip = computed(() => {

        let content = 'hello world'
        
        return { 
            content, 
            shown: editor?.show && state.hovered, 
            triggers: [], 
            placement: "auto-start", 
            popperClass: `pockets-node-tree-node-tooltip`,
            delay: 1
        }
    })
    let state = reactive( {
        selected,
        active,
        classes,
        hovered,
        toolTip,
        clickHandler: () =>  {
            if(!editor.show) return
            return editor.active = newApi 
        },
    } )

    return state
}

let pathProvider = (providerKey: string) => {
    return (props) => {
        let current = inject(providerKey , [] )
        let path = [ ...current, props.nodeId ]
        provide( providerKey, path)
        return path
    }
}

let nodeHiearchy = (api: any ) => {
    let providerKey = 'pockets/node-tree/node-hiearchy'    
    let current = inject(providerKey , [] )
    let path = [ ...current, api ]
    provide( providerKey, path)
    return path
}



