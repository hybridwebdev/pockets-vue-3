<template>
    <div class='text-danger fw-8 fs-20 pt-2' v-if='!editor.active.remove.self'>
        <p class='text-center'>
            This Node cannot be removed!
        </p>
    </div>
    <div class='p-2 grid columns-1 gap-1' v-if='editor.active.remove.self'>
        <span class='text-center fw-8'>
            Are you sure you want to remove this item?
        </span>
        <button
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