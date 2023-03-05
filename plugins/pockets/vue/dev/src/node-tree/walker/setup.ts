import { editor } from "@/node-tree/editor"
import { computed, ref, reactive, provide, inject } from "vue"
import { useInject } from "@/node-tree/create-tree-api/injection-key"
export let setup = (props) => {

    let createHiearchy = (api) => {
        let providerKey = 'node-tree/hiearchy'
        let hiearchy = inject(providerKey, [])
        let newHiearchy = [...hiearchy, api]
        provide(providerKey, newHiearchy)
        return {
            title: computed(() => newHiearchy.map(e => e.schema.title).join(" > "))
        }
    }

    let newApi = useInject().getNodeApi(props.treeNode)

    let hiearchy = createHiearchy(newApi)

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

        return { 
            content: hiearchy.title, 
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
