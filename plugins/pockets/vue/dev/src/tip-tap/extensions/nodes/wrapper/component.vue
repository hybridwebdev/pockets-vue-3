<template>
    <node-view-wrapper 
        v-bind='{...node.attrs, ...extension.config.baseAttrs }'
        @click='editor.nodeTree.active = { updateAttributes, node, extension }'
    />
</template>
<script setup lang='ts'>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

</script>
