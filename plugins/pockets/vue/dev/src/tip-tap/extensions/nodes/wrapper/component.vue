<template>
    <node-view-wrapper 
        v-bind='{...node.attrs, ...extension.config.baseAttrs }'
        @click='click'
    />
</template>
<script lang='ts'>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { reactive, computed, watch } from 'vue'
let setup = (props) => {

    let click = () => {

        let { updateAttributes, node, extension, editor } = props
        editor.nodeTree.active = reactive({
            attrs: node.attrs,
            updateAttributes
        })
        watch( () => editor.nodeTree.active.attrs, (k) => updateAttributes(k), { deep: true } )

    }
    
    return { 
        click
    }
}

export default {
    components: {NodeViewWrapper},
    setup, 
    props: { ...nodeViewProps }    
}
</script>
