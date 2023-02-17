import { $pockets } from "@/pockets"
import type { TreeEditor } from "@/node-tree/node-tree-api/types"
import { reactive } from "vue"

export let editor:TreeEditor  = reactive( {

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

    save: () => $pockets.event.emit('pockets/node-tree/save')

} )
