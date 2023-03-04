<template>
    <tree-walker
        :tree-node='api.getNode("root").node'
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
import ObservableSlim from "observable-slim"
let $props = defineProps( {
    root: {
        type: Object,
        required: true
    },
    source: {
        type: Object,
    }
} )


let props:any = ObservableSlim.create($props, false, (change) => {
    console.log(change)
})     

let api = createApi(props)

provide(injectionKey, api )

onMounted( () => $pockets.event.on('pockets/node-tree/save', api.saveTree) )

</script>