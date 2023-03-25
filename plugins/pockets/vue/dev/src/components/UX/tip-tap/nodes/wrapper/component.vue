<template>
    <node-view-wrapper as='p' contenteditable='false'>
      <node-view-content class="content" />
      {{selected}} selected
    </node-view-wrapper>
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
