<template>
    <component 
        :is='treeNode.el'
        v-bind='treeNode.props'
        class='pockets-node-tree-node'
        @click.stop='clickHandler'
        :class='classes'
        @mouseenter='hoverHandler(true)'
        @mouseleave='hoverHandler(false)'
        v-tooltip='toolTip'
    >
        <component 
            v-for='(node, i) in treeNode.nodes'
            is='tree-walker'
            :tree-node='node'
            :key='node.__targetPosition'
        />
    </component>
</template>
<script lang='ts'>
import { setup } from "./setup"

let props = {
    treeNode: {
        /**
            This is an object so that the observableSlim proxy isn't lost
        */
        el: String,
        data: Object,
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