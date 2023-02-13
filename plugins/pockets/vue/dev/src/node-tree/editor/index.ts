
import type { TreeData, TreeEditor, TreeNodeApi } from "@/node-tree/types"

import { generateApi } from "./stores/generate-api"

import { reactive, ref, computed } from "vue"

let active = ref<TreeData | false>(false)  

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

    triggerNode: (o: TreeData | false) => {
        active.value = o
    }

} )
