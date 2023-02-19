<template>
    <div class='p-2 grid columns-1 gap-1'>
        <span class='text-center fw-8'>
            Are you sure you want to remove this item?
        </span>
        <button
            :disabled='!editor.active.remove.self'
            @click='remove'
            class='m-auto btn btn-danger fw-8 text-white px-4 py-1'
        >
            <i class='fa fa-eraser'></i>
            REMOVE
        </button>
    </div>
</template>
<script lang='ts' setup>
import { inject } from "vue"
let editor = inject("pockets-node-tree-editor")
let remove = async () => {
    editor.active.remove.self()
    editor.active = false
}
</script>