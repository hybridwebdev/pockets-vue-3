
<template>
    <slot v-bind='drag' :style='style'></slot>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDraggable, useElementSize, useWindowSize } from '@vueuse/core'

type propDef = {
    x: "start" | "end",
    y: "start" | "end"
}

let props = withDefaults( defineProps<propDef>(), {
  x: 'end',
  y: "end"
})

let container = ref<HTMLElement | null>(null)
let handle = ref<HTMLElement | null>(null)

let elSize = useElementSize(container)
let windowSize = useWindowSize()

let boundaries = computed( () => {
    return {
        x: {
            start: 0,
            end: windowSize.width.value - elSize.width.value
        },
        y: {
            start: 0,
            end: windowSize.height.value - elSize.height.value
        }
    }
} )

let { x, y, style } = useDraggable(container, {
    handle,
    initialValue: { 
        x: boundaries.value.x[props.x], 
        y: boundaries.value.y[props.y], 
    },
} )

let validateY = () => {
    if(y.value < boundaries.value.y.start ) {
        y.value = boundaries.value.y.start
    }
    if(y.value > boundaries.value.y.end ) {
        y.value = boundaries.value.y.end
    }
}
let validateX = () => {
    if(x.value < boundaries.value.x.start ) {
        x.value = boundaries.value.x.start
    }
    if(x.value > boundaries.value.x.end ) {
        x.value = boundaries.value.x.end
    }
}

watch([ y, elSize.height ], validateY)
watch([ x, elSize.width ], validateX)

let drag = {
    container,
    handle,
}

</script>
