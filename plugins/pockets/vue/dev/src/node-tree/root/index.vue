<template>
    <tree-walker
        v-bind='root'
        node-id='root'
    />
</template>
<script lang='ts' setup>
import treeWalker from "@/node-tree/walker"
import { provide } from "vue"
import { createApi } from './node-tree-api'
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

let api = createApi(props)

provide('pockets-node-tree-api', api )


</script>