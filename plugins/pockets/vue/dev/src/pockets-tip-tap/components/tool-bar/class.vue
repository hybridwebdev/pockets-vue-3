<template>
    <div v-if='node'>
        <input v-model='node.props.class'>
    </div>
</template>
<script lang='ts' setup>
import { useSelectedNode, injectEditor } from "@/pockets-tip-tap/"
let node = useSelectedNode(injectEditor())
</script>