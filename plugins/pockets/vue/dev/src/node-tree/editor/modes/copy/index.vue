<template>
    <div class='p-2'>
        <div v-if='editor.selectedNodes.length==0'>    
            <button @click='trigger' class='btn btn-accent-dk p-2'>
                Copy Element
            </button>
        </div>

        <div v-if='!editor.selectedNodes.length==0' class='grid columns-3 gap-1'>    
            <nodePlacement 
                :api='editor.active'
                @before='confirm("before")'
                @after='confirm("after")'
                @inside='confirm("inside")'
            />
        </div>
    </div>
</template>
<script lang='ts' setup>
import nodePlacement from "@/node-tree/editor/sections/node-placement"
import { inject, toRaw  } from "vue"

let editor = inject('pockets-node-tree-editor')

let trigger = () => {
    editor.selectNode(editor.active.activateInfo)
}
let selectedNode = $computed(() => {
    return editor.selectedNodes[0] ?? false
})
let confirm = async (location) => {
    let node = toRaw (selectedNode.node)
    let map = {
        inside: async () => {
            console.log(node)
            // selectedNode.remove()
            // editor.active.addSibling(selectedNode.node, false)
        },
        before: async () => {
            console.log(node)
            // selectedNode.remove()
            // editor.active.addSibling(selectedNode.node, false)
        },
    }

    let fn = map[location] ?? false
    if(typeof fn != 'function') return

    await fn()
    console.log('off')
    editor.selectNode(false)
}
</script>