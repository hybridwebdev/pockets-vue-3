import { $pockets } from "@/pockets"
import type { TreeEditor } from "@/node-tree/types"
import { reactive, computed } from "vue"

export let editor:TreeEditor  = reactive( {

    show: false,
    mode: "edit",
    
    nodes: {
        list: [],
        fields: []
    },
    active: false,
    selectedNodes: [],
    save: () => $pockets.event.emit('pockets/node-tree/save'),
    modeLocked: computed(() => {
        if(editor.selectedNodes.length > 0) return true;
    })

} )
