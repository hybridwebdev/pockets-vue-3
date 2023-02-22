<template>
    <div class='p-2'>
        <div class='text-danger fw-8 fs-20 pt-2' v-if='adder.add.disabled'>
            <p class='text-center'>
                This Node cannot be moved
            </p>
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
