import { $pockets } from "@/pockets"

import { reactive } from "vue"

export let editor:any  = reactive( {

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
