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

        let { updateAttributes, node, editor } = props

        let attrs = new Proxy( node.attrs, {
            get: (target, k) => target[k],
            set: (target, k, v) => updateAttributes( { [k]:v } ) ? true : true
        } )

        editor.nodeTree.active = {
            attrs,
        }

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
