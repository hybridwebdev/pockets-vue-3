<template>
    <tree-walker
        v-bind='root'
        node-id='root'
    />
</template>
<script lang='ts' setup>
import treeWalker from "@/node-tree/walker"
import { provide } from "vue"
import type { TreeData } from "@/node-tree/types"

let props = defineProps( {
    root: {
        type: Object,
        required: true
    },
    source: {
        type: Object,
    }
} as TreeData )

provide('pockets-node-tree-root', props )

</script>