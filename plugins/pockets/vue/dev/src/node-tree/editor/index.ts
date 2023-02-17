
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
    active: false,
    
    selectedNodes: computed<Array<TreeNodeApi | false>>( () => {
        return selectedNodes.value.map( generateApi )
    } ),
    setActiveNode: (o: any) => {
        editor.active = o
    },
    selectNode: (o: TreeData | false) => {
        if(!o) {
            selectedNodes.value = []
            return;
        }
        selectedNodes.value.push(o)
    },

} )
