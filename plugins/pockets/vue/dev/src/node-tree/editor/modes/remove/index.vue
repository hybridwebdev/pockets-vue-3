<template>
    <div class='grid columns-1 gap-2 p-2'>

        <div 
            v-if='!editor.active'
            class='fw-8 text-center'
        >
            Select a node to remove.
        </div>

        <div v-if='editor.active'>
        
            <p class='text-center text-danger fw-8 m-0' v-if='!editor.active.remove.self'>
                This Node cannot be removed!
            </p>
        
            <div class='grid columns-1 gap-2' v-if='editor.active.remove.self'>
                <button
                    @click='remove'
                    class='m-auto btn btn-outline-danger fw-8 px-8 py-2 rounded-0'
                    v-tooltip='"Removes Node"'
                >
                    REMOVE
                </button>
            </div>
        </div>
    </div>

</template>
<script lang='ts' setup>
import { editor } from "@/node-tree/editor"
let remove = async () => {
    editor.active.remove.self()
    editor.active = false
}
</script>