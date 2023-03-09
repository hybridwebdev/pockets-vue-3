
<template>
    <slot v-bind='drag' :style='style'></slot>
</template>
<script setup lang="ts">
import { useWindowDraggable } from "@/pockets/use/window-draggable"
type propDef = {
    x?: "start" | "end",
    y?: "start" | "end"
}

let props = withDefaults( defineProps<propDef>(), {
  x: 'end',
  y: "end"
} )

let { container, handle, style } = useWindowDraggable(props)

let drag = {
    container, handle
}

</script>
