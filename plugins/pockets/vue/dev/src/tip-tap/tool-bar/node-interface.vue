<template lang='pug'>
div(v-if='editor.nodeTree.active')
    input(
        v-model="editor.nodeTree.active.attrs.class"
    )

    button(
        @click='click'
    ) Add teh image
</template>
<script lang='ts' setup>
import { reactive, inject, computed } from "vue"
let nodes = [
    {
        type: "image",
        attrs: {
            src: "https://placehold.co/600x400"
        }
    },
]
let editor = inject('tip-tap-editor')

let click = () => {
    console.log(editor)
    editor.commands.insertContentAt(editor.state.selection.$to.pos, nodes[0] ) ;
}
</script>