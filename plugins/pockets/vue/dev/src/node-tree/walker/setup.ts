
import { editor } from "@/node-tree/editor"
import { generateApi  } from "@/node-tree/editor/stores/generate-api"
import { TreeData } from "@/node-tree/types"
import { inject, provide, computed, ref } from "vue"
import { useInject } from "@/node-tree/node-tree-api/injection-key"

export let setup = (props) => {
    
    let { path } = pathProvider('pockets-node-tree-path')(props)

    let nodeApi = useInject().getNode(path)

    let tree:TreeData['tree'] | false = inject('pockets-node-tree-root') ?? false

    if(!tree) return;
    
    let hovered = ref(false)

    let active = computed(() => {
        
        if(!editor?.active || !editor?.active?.paths) return

        if(editor?.active?.paths?.full == nodeApi.paths.full) return "active"

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
    
    let hiearchy = nodeHiearchy(nodeApi)

    return {
        clickHandler: () =>  {
            if(!tree || !editor.show) return
            return editor.setActiveNode( nodeApi )
        },
        hovered,
        classes,
        editor,
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



