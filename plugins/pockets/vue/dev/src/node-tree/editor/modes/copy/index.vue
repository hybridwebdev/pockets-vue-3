<template>
    <div class='p-2'>
        Inside {{adder}}
        <div v-if='!selected'>    
            <button @click='selectNode' class='btn btn-accent-dk p-2'>
                Copy Element
            </button>
        </div>
        <div v-if='selected' class='grid columns-3 gap-1'>    
            <nodePlacement 
                :api='adder'
                @before="adder.add.before"
                @after="adder.add.after"
                @inside="adder.add.inside"
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
