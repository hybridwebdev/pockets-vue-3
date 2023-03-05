import { editor } from "@/node-tree/editor"
import { computed, ref, reactive } from "vue"
import { useInject } from "@/node-tree/create-tree-api/injection-key"

export let setup = (t) => {
    let props = t.treeNode
    
    let newApi = useInject().getNodeApi(props)

    let hovered = ref(false)

    let selected = computed( () =>  false )

    let active = computed( () => {
        if(!editor?.active ) return;
        if(editor?.active?.paths.full == newApi.paths.full) return true
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
