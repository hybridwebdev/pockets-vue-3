<template>
    <node-view-wrapper v-bind='nodeViewProps.attrs' :as='extension.config.tag'/>
</template>
<script setup lang='ts'>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
</script>
