<template>
    <node-view-wrapper v-bind='node.attrs' />
</template>
<script>
import { computed } from "vue"
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
export default {
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
  },
}
</script>
