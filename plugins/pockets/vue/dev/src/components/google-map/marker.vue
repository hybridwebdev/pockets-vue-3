<template>
    <render/>
</template>
<script lang='ts' setup>
/**
    This is a renderless component. 
*/
import { inject } from "vue"

let props = defineProps({
    lat: {
        type: Number
    }, 
    lng: {
        type: Number
    }, 
})

let render = () => {}

let api: { map: any, google: any } = inject('google-maps')

let { lat, lng } = props

new api.google.maps.Marker({
    position: new api.google.maps.LatLng( { lat, lng } ),
}).setMap(api.map)

</script>
