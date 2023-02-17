<template>
    <tree-walker
        v-bind='root'
        node-id='root'
    />
</template>
<script lang='ts' setup>
import treeWalker from "@/node-tree/walker"

import { provide, InjectionKey } from "vue"

import { createApi } from '@/node-tree/node-tree-api'

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

// export let API_INJECTION_KEY: InjectionKey<> = Symbol('pockets-node-tree-api')


</script>