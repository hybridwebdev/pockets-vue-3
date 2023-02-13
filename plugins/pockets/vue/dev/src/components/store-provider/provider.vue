<template>
    <slot v-if='store' v-bind="store"></slot>
</template>
<script lang='ts'>
    export default {
        inheritAttrs: false
    }
</script>
<script lang='ts' setup>
import { computed } from "vue"
import { $pockets } from "@/pockets/"
let props = defineProps({
    use: {
        type: String,
        required: true
    }
})

let store = computed(() => $pockets.store.use(props.use) )

</script>