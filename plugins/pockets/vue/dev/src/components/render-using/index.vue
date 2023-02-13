<template>
    <div ref='container'></div>
</template>
<script lang='ts' setup>
import { onMounted, onUnmounted, ref } from "vue"
let props = defineProps({
    target: {
        type: String,
        required: true
    }
})
let container = ref()
let $children = ref()
let $target =  ref()
/**
    Moves children from original container to component
*/
onMounted(()=>{
    $target.value = document.querySelector(props.target)
    $children.value = $target.value.childNodes[0]
    if($children.value) container.value.appendChild($children.value)
})
/**
    Moves children back to original container
*/
onUnmounted(() =>  $target.value.appendChild($children.value) )
</script>
