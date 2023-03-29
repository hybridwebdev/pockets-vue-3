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

let nodes = Object.values(editor.schema.nodes).map(e=> {
    return e
} )
console.log(nodes, editor)
let click = (node) => {
    editor.commands.insertContentAt(editor.state.selection.$to.pos, node ) ;
}
</script>