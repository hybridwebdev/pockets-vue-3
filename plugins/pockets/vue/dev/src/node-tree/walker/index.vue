<template>
    <component 
        :is='el'
        v-bind='props'
        class='pockets-node-tree-node'
        @click.capture='clickHandler'
        :class='classes'
        @mouseenter='hovered = true'
        @mouseleave='hovered = false'
        v-tooltip='toolTip'
    >
        <component 
            v-for='(node, i) in nodes'
            is='tree-walker'
            v-bind='node'
            :node-id='i'
            :key='i + node.schema'
        />
    </component>
</template>
<script lang='ts'>
import { setup } from "./setup"

let props = {
    nodeId: {
        type: [String, Number],
        required: true
    },
    el: String,
    nodes: {
        type: Array,
    },
    props: Object,
    data: Object,
    schema: String
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