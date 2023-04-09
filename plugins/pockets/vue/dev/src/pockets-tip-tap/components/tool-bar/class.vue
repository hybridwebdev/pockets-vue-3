<template>
    <div v-if='node'>
        <input v-model='node.props.class'>
    </div>
</template>
<script lang='ts' setup>
import { useSelectedNode } from "@/pockets-tip-tap/extensions/vue-use"
import { injectEditor } from "@/pockets-tip-tap/"
let node = useSelectedNode(injectEditor())
</script>