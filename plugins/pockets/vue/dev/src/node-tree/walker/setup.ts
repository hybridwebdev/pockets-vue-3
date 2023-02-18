import { editor } from "@/node-tree/editor"
import { inject, provide, computed, ref, reactive } from "vue"
import { useInject } from "@/node-tree/create-tree-api/injection-key"

export let setup = (props) => {

    let path = pathProvider('pockets/node-tree/path')(props)
    
    let nodeApi = useInject().getNode( path )

    let hovered = ref(false)

    let active = computed( () => {
        if(!editor?.active || !editor?.active?.paths) return;
        if(editor?.active?.paths?.full == nodeApi.paths.full) return true
    } )

    let classes = computed(() => {
        let {
            active,
            hovered
        } = state
        return {
            hovered,
            active,
            "editor-show": editor.show
        }
    })
    
    let hiearchy = nodeHiearchy(nodeApi)

    let toolTip = computed(() => {
        
        let content:string | boolean = false
        let popperClass: string = ''
        if(editor?.show) {
            if(state.hovered || state.active) {
                content = hiearchy.map(e => e.schema.title).join(' > ')
            }
            if(state.active) {
                popperClass = ''
            }
        }
        return { 
            content, 
            shown: content, 
            triggers: [], 
            placement: "auto-start", 
            popperClass: `pockets-node-tree-node-tooltip ${popperClass}`,
            delay: 0
        }
    })
    let state = reactive( {
        active,
        classes,
        hovered,
        toolTip,
        clickHandler: () =>  {
            if(!editor.show) return
            return editor.active = nodeApi 
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



