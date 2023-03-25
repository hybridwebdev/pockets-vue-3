<template>
    <node-view-wrapper as='p' @click='test'/>
</template>
<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
export default {
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  mounted(){
      console.log(this)
  },
  methods: {
    test(){
         
    }
  }
}
</script>
