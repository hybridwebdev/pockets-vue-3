<template>
    <node-view-wrapper 
        v-bind='node.attrs' 
        :as='node.type.spec.nodeSchema.as' 
        v-tooltip='node.type.name'
    />
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

export default {
    components: {
        NodeViewWrapper,
        NodeViewContent
    },
    props: nodeViewProps,
    setup(props){
        let click = () => {
            console.log(props, 'clickity')
        }
        return {
            click
        }
    }
}
</script>
<style lang="scss">
</style>