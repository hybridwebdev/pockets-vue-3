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
                <button
                    @click='clone'
                    class='m-auto btn btn-outline-confirm fw-8 px-8 py-2 rounded-0'
                    v-tooltip='"Confirming will copy node directly after itself."'
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