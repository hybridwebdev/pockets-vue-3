<template>
    <component 
        :is='treeNode.el'
        v-bind='treeNode.props'
        class='pockets-node-tree-node'
        @click.capture='clickHandler'
        :key='treeNode.hash'
        :class='classes'
        @mouseenter='hovered = true'
        @mouseleave='hovered = false'
        v-tooltip='toolTip'
    >
        <component 
            v-for='(node, i) in treeNode.nodes'
            is='tree-walker'
            :node-id='i'
            :tree-node='node'
        />
    </component>
</template>
<script lang='ts'>
import { setup } from "./setup"

let props = {
    nodeId: {
        type: [String, Number]
    },
    treeNode: {
         el: String,
        data: Object,
        hash: {
            type: String,
            required: true
        },
        nodeId: {
            type: [String, Number],
            required: true
        },
        nodes: {
            type: Array,
        },
        props: Object,
        schema: String,
    },
}
export default {
    name: "tree-walker",
    setup,
    props
}
</script>
<style lang='scss'>
    .pockets-node-tree-node-tooltip {
        .v-popper__inner {
            background: var(--bs-accent-dk);
            opacity: 1;
            border-radius:0px;
        }
        .v-popper__arrow-container {
            display: none;
        }
    }
    
    
    .pockets-node-tree-node {
        &.selected {
            outline: 5px solid #f00 !important
        }
        &.editor-show {
            button,
            a,
            iframe {
                pointer-events: none 
            }
            &.active {
                outline: 5px solid var(--bs-green);
            }
            &.hovered:not(.active) {
                outline: 5px solid var(--bs-accent-dk);
            }
        }
    }
     
</style>