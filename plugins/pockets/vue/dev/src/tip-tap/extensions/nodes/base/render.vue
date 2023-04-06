<template>
    <node-view-wrapper 
        v-bind='node.attrs' 
        :as='node.type.spec.nodeSchema.as' 
        v-tooltip='node.type.name'
        data-drag-handle
        @click.self='click'
    />
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { computed } from "vue"
export default {
    components: {
        NodeViewWrapper,
        NodeViewContent
    },
    props: nodeViewProps,
    setup(props){
        // let editable = computed(() => {
        //     let { editor, node } = props
        //     if(!editor.nodeTree.active) return;
        //     return node.attrs.blockId == editor.nodeTree.active.attrs.blockId
        // }) 
        let click = () => {
            // let { editor, getPos } = props
            // editor.commands.setNodeSelection(getPos())
        }
        return {
            click,
            //editable
        }
    }
}
</script>
<style lang="scss">
</style>