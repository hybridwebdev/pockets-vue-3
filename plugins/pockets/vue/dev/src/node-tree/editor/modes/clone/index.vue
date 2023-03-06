<template>
    <div class='p-2 grid columns-1 gap-2'>

        <div 
            v-if='!editor.active'
            class='fw-8 text-center'
        >
            Select a node to clone.
        </div>

        <div v-if='editor.active'>

            <p class='text-center text-danger fw-8 m-0'  v-if='!editor.active.clone.self'>
                This Node cannot be cloned!
            </p>

            <div class='grid columns-1 gap-2' v-if='editor.active.clone.self'>
                <p class='text-center fw-8 m-0'>
                    Are you sure you want to copy this item?
                </p>
                <button
                    @click='clone'
                    class='m-auto btn btn-accent-dk fw-8 text-white px-8 py-2'
                >
                    CLONE
                </button>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { editor } from "@/node-tree/editor"
let clone = () => {
    let node = editor.active.clone.self()
    editor.active = editor.active.getNodeApi(node)
}
</script>