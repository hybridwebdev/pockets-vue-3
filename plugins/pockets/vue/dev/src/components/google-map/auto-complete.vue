<template>
    <input ref='inputRef' type='text' @keyup='changed'>
</template>
<script lang='ts' setup>
import { reactive, ref, inject, onMounted } from 'vue'

let props = defineProps({
    componentRestrictions: {
        type: Object,
        default: {

        }
    },
    types: {
        type: Array,
        default: ['geocode']
    },
})  

let { google } = inject("google-maps")

let emit =  defineEmits(['place-selected', 'place-cleared'])

let inputRef = ref(null)

let place_selected = _ => emit('place-selected', api )

let api = reactive({
    places: null,
})

onMounted( () => {
    api.places = new google.maps.places.Autocomplete(inputRef.value, props as any)
    google.maps.event.addListener(api.places, 'place_changed', place_selected)
} ) 

let changed = e => {
    let v = e.target.value
    if(!v || v && v=='') emit('place-cleared')
}
</script>