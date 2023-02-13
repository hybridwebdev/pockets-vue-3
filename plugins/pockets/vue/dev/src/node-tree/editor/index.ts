
import type { TreeData, TreeEditor, TreeNodeApi } from "@/node-tree/types"

import { generateApi } from "./stores/generate-api"

import { reactive, ref, computed } from "vue"

let active = ref<TreeData | false>(false)  

let selectedNodes = ref<Array<TreeData>>([])  

export let editor:TreeEditor = reactive( {

    show: true,
    mode: "edit",
    options: {
        "editor-active": false
    },
    nodes: {
        list: [],
        fields: []
    },
    active: computed<TreeNodeApi | false>( () => generateApi(active.value) ),
    
    selectedNodes: computed<Array<TreeNodeApi | false>>( () => {
        return selectedNodes.value.map( (e) => {
            console.log(e)
            return generateApi(e)
        } )
    } ),
    triggerNode: (o: TreeData | false) => {
        active.value = o
    },
    selectNode: (o: TreeData) => {
        selectedNodes.value.push(o)
    }

} )
