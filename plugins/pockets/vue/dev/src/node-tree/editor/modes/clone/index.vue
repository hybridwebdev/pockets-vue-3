<template>
    <div class='text-danger fw-8 fs-20 pt-2' v-if='!editor.active.clone.self'>
        <p class='text-center'>
            This Node cannot be cloned!
        </p>
    </div>
    <div class='p-2 grid columns-1 gap-1' v-if='editor.active.clone.self'>
        <span class='text-center fw-8'>
            Are you sure you want to copy this item?
        </span>
        <button
            @click='clone'
            class='m-auto btn btn-accent-dk fw-8 text-white px-4 py-1'
        >
            <i class='fa fa-copy'/>
            CLONE
        </button>
    </div>
</template>
<script lang='ts' setup>
import { inject } from "vue"
let editor = inject("pockets-node-tree-editor")
let clone = () => {
    let path = editor.active.clone.self()
    editor.active = editor.active.getNode(path)
}
</script>