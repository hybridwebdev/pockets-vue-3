<template>
    <div>    
        <button @click='trigger'>
            Copy Element
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