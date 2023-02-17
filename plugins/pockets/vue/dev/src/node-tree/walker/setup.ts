
import { editor } from "@/node-tree/editor"
import { generateApi  } from "@/node-tree/editor/stores/generate-api"
import { TreeData } from "@/node-tree/types"
import { inject, provide, computed, ref } from "vue"
import { useInject } from "@/node-tree/node-tree-api/injection-key"

export let setup = (props) => {
    
    
    let { path } = pathProvider('pockets-node-tree-path')(props)

    let nodeApi = useInject().getNode(path)

    console.log(nodeApi)

    let tree:TreeData['tree'] | false = inject('pockets-node-tree-root') ?? false

    if(!tree) return;
    
    let hovered = ref(false)

    let api = generateApi({tree, path})

    let active = computed(() => {
        
        if(!editor?.active || !editor?.active?.paths || !api) return

        if(editor?.active?.paths?.source == api.paths.source) return "active"

    })

    let editorShow = computed(() => {
        if(!editor?.show ?? null) return "editor-hide"
        return "editor-show"
    })

    let editorOpen = computed(() => {
        if(!editor?.active ?? null) return "editor-closed"
        return "editor-open"
    })

    let classes = computed(() => [
        active.value, 
        editorOpen.value, 
        editorShow.value,
        hovered.value === true ? "hovered" : ""
    ])

    let showTip = computed(() => {
        if(!editor?.show ?? null) return false
        if(hovered.value == true) return true
        return false
    })
    
    let hiearchy = nodeHiearchy(api)

    return {
        clickHandler: () =>  {
            if(!tree || !editor.show) return

            editor.newActive = nodeApi
            
            return editor.setActiveNode( {
                path, 
                tree
            })
        },
        hovered,
        classes,
        editor,
        api,
        showTip,
        tipContent: computed(() => {
            return hiearchy.map(e => {
                return e.schema.title
            }).join(' > ')
        }),

    }

}

let pathProvider = (providerKey: string) => {
    return (props) => {
        let current = inject(providerKey , [] )
        let path = [ ...current, props.nodeId ]
        provide( providerKey, path)
        return { path }
    }
}

let nodeHiearchy = (api: any ) => {
    let providerKey = 'a-test-of-this'    
    let current = inject(providerKey , [] )
    let path = [ ...current, api ]
    provide( providerKey, path)
    return path
}



