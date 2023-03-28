<template>
    <node-view-wrapper v-bind='{...nodeViewProps.attrs, ...extension.config.baseAttrs }'/>
</template>
<script setup lang='ts'>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
</script>
