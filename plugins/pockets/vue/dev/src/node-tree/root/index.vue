<template>
    <tree-walker
        v-bind='root'
        node-id='root'
    />
</template>
<script lang='ts'>
</script>
<script lang='ts' setup>
import treeWalker from "@/node-tree/walker"
import { provide } from "vue"
import { createApi } from '@/node-tree/node-tree-api'
import { injectionKey } from "@/node-tree/node-tree-api/injection-key"

let props = defineProps( {
    root: {
        type: Object,
        required: true
    },
    source: {
        type: Object,
    }
} )

provide('pockets-node-tree-root', props )

provide(injectionKey, createApi(props) )




</script>