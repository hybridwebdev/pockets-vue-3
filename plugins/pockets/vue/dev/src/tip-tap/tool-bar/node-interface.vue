<template lang='pug'>
div(v-if='editor.nodeTree.active')
    input(
        v-model="editor.nodeTree.active.attrs.class"
    )
    button(
        @click='click(node)'
        v-for='node in nodes'
    ) {{node.name}}
</template>
<script lang='ts' setup>
import { reactive, inject, computed } from "vue"
let editor = inject('tip-tap-editor')

let nodes = Object.values(editor.schema.nodes)
    //.filter( e=>  e.spec.nodeSchema )
console.log(editor.schema.nodes)
let click = (node) => {
    editor.commands.insertContentAt(editor.state.selection.$to.pos, node.spec.nodeSchema.default, {
         updateSelection: true,
    }) 
}
</script>