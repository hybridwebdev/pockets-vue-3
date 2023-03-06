<template>
    <div 
        v-if='!editor.active'
        class='p-2 text-center fw-8'
    >
        Select a node to move.
    </div>
    <div class='p-2' v-if='editor.active'>
        <div class='text-danger fw-8 fs-18 text-center' v-if='!editor.active.parent && !selected'>
            This Node cannot be moved
        </div>
        <div v-if='!selected && editor.active.parent'>    
            <button @click='selectNode' class='btn btn-accent-dk p-2'>
                Move Element
            </button>
        </div>
        <div v-if='selected' class='grid columns-3 gap-1'>    
            <nodePlacement 
                :api='adder'
                @before="confirm('before')"
                @after="confirm('after')"
                @inside="confirm('inside')"
            />
            <button @click='cancel' class='btn btn-accent-dk p-2'>
                Cancel Move
            </button>
        </div>
    </div>
</template>
<script lang='ts'>
import { setup } from "./setup"
import nodePlacement from "@/node-tree/editor/sections/node-placement/index.vue"
export default {
    components: { nodePlacement },
    setup
}
</script>
