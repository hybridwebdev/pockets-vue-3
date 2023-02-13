<template>
    <div v-if='editor.selectedNodes.length==0'>    
        <button @click='trigger'>
            Copy Element
        </button>
    </div>
    <div v-if='!editor.selectedNodes.length==0'>    
        <button @click='confirm'>
            Confirm Placement
        </button>
    </div>
</template>
<script lang='ts' setup>

import { inject } from "vue"

let editor = inject('pockets-node-tree-editor')

let trigger = () => {
    editor.selectNode(editor.active.activateInfo)
    editor.setActiveNode(false)
    console.log(editor.selectedNodes)
}

let confirm = () => {

}
</script>