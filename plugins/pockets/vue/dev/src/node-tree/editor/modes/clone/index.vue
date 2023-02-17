<template>
    <div class='p-2 grid columns-1 gap-1'>
        <span class='text-center fw-8'>
            Are you sure you want to copy this item?
        </span>
        <button
            :disabled='!editor.active.clone.self'
            @click='editor.active.clone.self'
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
</script>