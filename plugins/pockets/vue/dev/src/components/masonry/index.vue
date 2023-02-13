<template>
    <div ref='container'>
        <slot/>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from "vue"
import masonry from "masonry-layout"
import imagesLoaded from "imagesloaded"
let container = ref(null)

let props = defineProps({
    itemSelector: {
        type: String,
        default: '.grid-item'
    },
    percentPosition: {
        default: true,
        type: Boolean
    },
    gutter: {
        default: 0,
        type: Number
    }
})

let initMasonry = () => imagesLoaded( container.value, () => new masonry( container.value, props ) )

onMounted(initMasonry)

</script>
 