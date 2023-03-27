<template>
    <node-view-wrapper as='p' contenteditable='false' v-bind='node.attrs'>
      <node-view-content class="content" as='pp' />
      <input v-model='test'>
    </node-view-wrapper>
</template>
<script>
import { computed } from "vue"
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
let setup = (props, ) => {
  let test = computed({
    get(){
      return props.node.attrs.class
    },
    set(v){
      props.updateAttributes({class: v})
      // props.setContent("<p>aaaaaaaa</p>")
      
    }
  })
  return {
    test
  }
}
export default {
  props: {
    ...nodeViewProps,
    class: {
      type: String
    }
  },
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  mounted(){
    console.log(this)
  },
  setup
}
</script>
