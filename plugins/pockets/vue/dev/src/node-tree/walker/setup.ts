import { editor } from "@/node-tree/editor/"
import { computed, ref, reactive, provide, inject } from "vue"
import { useInject } from "@/node-tree/create-tree-api/injection-key"

export let setup = (props) => {

    let disabled = computed(() => {
        if(state.selected && editor.mode == 'move') return true
    })

    let nodeApi = useInject().getNodeApi(props.treeNode)

    let selected = computed( () =>  editor.selectedNodes.filter(e => e.paths.full == nodeApi.paths.full ).length > 0 )
    
    let childOfselected = computed( () =>  editor.selectedNodes.filter(e => {
        if(nodeApi.paths.full.length == e.paths.full.length) return false;
        return nodeApi.paths.full.includes(e.paths.full)
    } ).length > 0 )
    
    let active = computed( () => {
        if(!editor?.active ) return;
        if(editor?.active?.paths.full == nodeApi.paths.full) return true
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
            selected
        }
    })

    let toolTip = computed(() => {

        return { 
            content: nodeApi.branch.map(e => e.schema.title).join(' > ') + state.disableInteractions, 
            shown: editor?.show && state.hovered, 
            triggers: [], 
            placement: "auto-start", 
            popperClass: `pockets-node-tree-node-tooltip`,
            delay: 1
        }

    })

    let key = 'pockets/node-tree/node/disable-interactions'

    let hoverHandler = (value: boolean) => {
        if(state.childOfselected || state.selected) return;
        state.hovered = value
    }
    let clickHandler = () => {
        if(!editor.show) return
        if( state.childOfselected ) return;
        return editor.active = nodeApi 
    }
    let state = reactive( {
        hovered: false,
        disabled,
        selected,
        childOfselected,
        active,
        classes,
        hoverHandler,
        toolTip,
        disableInteractions: childOfselected,
        clickHandler,
        
    } )

    return state
    
}
