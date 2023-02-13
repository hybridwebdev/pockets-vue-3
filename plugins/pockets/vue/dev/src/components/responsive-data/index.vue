<template>
    <render>
        <slot v-bind="data"></slot>
    </render>
</template>
<script lang='ts' setup>
import { useAttrs, onUnmounted, onMounted, computed, ref } from 'vue'

let render = (_, ctx) => ctx.slots.default()

let resizeWatcher = () => {
  let windowWidth = ref(window.innerWidth)
  let width = computed(() => windowWidth.value)

  let resized = () => windowWidth.value = window.innerWidth
  onMounted(() => window.addEventListener('resize', resized))
  onUnmounted(() => window.removeEventListener('resize', resized))
  
  return { width }
}

let attrs = useAttrs()

let { width } = resizeWatcher()

let getter = () => {
    let keys = Object.keys(attrs).map(e => parseInt(e) ).sort((a, b) => a - b )
    let filteredKeys = keys.filter(v => v <= width.value )
    let key = filteredKeys.slice(-1)[0] ?? keys.slice(-1)[0]
    return attrs[key]
}

let data = computed(getter)

</script>