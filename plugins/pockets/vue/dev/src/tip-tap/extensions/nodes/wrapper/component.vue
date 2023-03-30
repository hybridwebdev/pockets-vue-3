<template>
    <node-view-wrapper 
        v-bind='{...node.attrs, ...node.type.spec.wrapperAttrs }'
    />
</template>
<script lang='ts'>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

export default {
    components: {
        NodeViewWrapper
    },
    props: nodeViewProps  
}
</script>
