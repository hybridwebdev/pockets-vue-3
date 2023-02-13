<template>
    <render>
        <div ref='containerRef' v-bind="$attrs">
            <slot v-if='api.map'/>
        </div>
    </render>
</template>
<script setup lang='ts'>
import { ref, reactive, onMounted, inject, provide } from "vue"

let { google } = inject('google-maps')

let props = defineProps({
    zoom: {
        type: Number,
        default: 10
    },
    center: {
        type: Array,
        default: []
    }
})    
/**
    Render creates a transparent wrapper that only returns its children.
*/
let render = (a, { slots } ) => slots.default() 

let containerRef = ref(null)

let api = reactive({
    map: null,
    google
})
onMounted(() => {
    
    let {
        zoom
    } = props

    api.map = new google.maps.Map(containerRef.value, {
        center: center_markers(props.center),
        zoom 
    } )

})

let center_markers = ( markers ) => {
    let avs = markers.reduce( ( collector, entry ) => {
        return {
            lat: collector.lat + parseFloat(entry.lat),
            lng: collector.lng + parseFloat(entry.lng),
        }
    }, { lat: 0, lng: 0 } )
    return {
        lat: avs.lat / markers.length,
        lng: avs.lng / markers.length
    }
}

provide('google-maps', api)


</script>
