
import type { TreeEditor } from "@/node-tree/types"

import { reactive } from "vue"

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

    setActiveNode: (o: any) => {
        editor.active = o
    },

} )
