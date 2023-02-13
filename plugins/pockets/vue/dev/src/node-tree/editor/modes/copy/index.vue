<template>
    <div v-if='editor.selectedNodes.length==0'>    
        <button @click='trigger'>
            Copy Element
        </button>
    </div>

    <div v-if='!editor.selectedNodes.length==0'>    
        <nodePlacement 
            :api='editor.active'
            @before='confirm("before")'
            @after='confirm("after")'
            @inside='confirm("inside")'
        />
        <button @click='confirm'>
            Confirm Placement
        </button>
    </div>

</template>
<script lang='ts' setup>
import nodePlacement from "@/node-tree/editor/sections/node-placement"
import { inject } from "vue"

let editor = inject('pockets-node-tree-editor')

let trigger = () => {
    editor.selectNode(editor.active.activateInfo)
    // editor.setActiveNode(false)
    console.log(editor.selectedNodes)
}

let confirm = (location) => {
    editor.selectNode(false)
}
</script>