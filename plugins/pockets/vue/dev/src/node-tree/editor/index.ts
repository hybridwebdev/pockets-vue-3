import { $pockets } from "@/pockets"
import type { TreeEditor } from "@/node-tree/types"
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

    save: () => $pockets.event.emit('pockets/node-tree/save')

} )
