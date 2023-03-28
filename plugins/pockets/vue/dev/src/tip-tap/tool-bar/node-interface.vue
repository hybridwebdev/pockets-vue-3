<template lang='pug'>
div(v-if='editor.nodeTree.active')
    input(
        v-model="editor.nodeTree.active.attrs.class"
    )

</template>
<script lang='ts' setup>
import { reactive, inject, computed } from "vue"
let state = {

}
let editor = inject('tip-tap-editor')

</script>