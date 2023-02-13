<template>
    <render>
        <slot v-if='api.google'/>
    </render>
</template>
<script lang='ts' setup>
import { reactive, provide } from "vue"
import { Loader } from '@googlemaps/js-api-loader'

let props = defineProps({
    apiKey: {
        type: String,
        required: true
    },
    libraries: {
        type: Array,
        default: () => []
    }
})    

let render = (a, {slots}) => slots.default()

let api = reactive({
    google: null,
})

let loader = new Loader(props as any)

loader.load().then(google => {
    api.google = google
})

provide('google-maps', api)

</script>