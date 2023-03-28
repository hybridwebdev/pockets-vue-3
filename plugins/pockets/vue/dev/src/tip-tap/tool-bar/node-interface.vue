<template lang='pug'>
div(v-if='editor.nodeTree.active')
    input(
        v-model="model"
    )

</template>
<script lang='ts' setup>
import { reactive, inject, computed } from "vue"
let state = {

}
let editor = inject('tip-tap-editor')
let model = computed({
    get(){
        console.log(editor)
        return editor.nodeTree.active.node.attrs.class
    },
    set(v){
        editor.nodeTree.active.updateAttributes({class: v})
    }
})
</script>