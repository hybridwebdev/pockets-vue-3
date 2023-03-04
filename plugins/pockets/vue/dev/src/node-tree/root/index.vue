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
import { provide, onMounted } from "vue"
import { createApi } from '@/node-tree/create-tree-api'
import { injectionKey } from "@/node-tree/create-tree-api/injection-key"

let props = defineProps( {
    root: {
        type: Object,
        required: true
    },
    source: {
        type: Object,
    }
} )

let api = createApi(props)
console.log(api)

provide(injectionKey, api )

onMounted( () => $pockets.event.on('pockets/node-tree/save', api.saveTree) )

</script>