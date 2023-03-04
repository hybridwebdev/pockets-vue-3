import { editor } from "@/node-tree/editor"
import { inject, provide, computed, ref, reactive, toRef } from "vue"
import { useInject } from "@/node-tree/create-tree-api/injection-key"

export let setup2 = (props) => {
    let nodeApi = useInject()
    let terst = nodeApi.getNodeApi(props)
    console.log(props.__getPath, props.__targetPosition, terst.path)
    //console.log(terst.path)
    // console.log(terst.__targetPosition)
}
export let setup = (props) => {
    //let props = t.treeNode
    // setup2(props)
    let path = pathProvider('pockets/node-tree/path')(props)
    console.log(path, props)
    let nodeApi = useInject().getNode( path )

    let hovered = ref(false)

    let selected = computed( () => {
        if(editor.selectedNodes.length == 0) return false;
        let selected = editor.selectedNodes.find(e => {
            return e.paths.full == nodeApi.paths.full
        })
        return selected
    } )

    let active = computed( () => {
        if(!editor?.active || !editor?.active?.paths) return;
        if(editor?.active?.paths?.full == nodeApi.paths.full) return true
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

        let content = hiearchy.map(e => e.schema.title).join(' > ')
        
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



