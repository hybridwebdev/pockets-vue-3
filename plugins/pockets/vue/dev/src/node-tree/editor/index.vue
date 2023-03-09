<template>
    <Teleport to='body'>
        
            <div
                class='border border-5 border-accent-lt pockets-node-tree-editor bg-accent-dk position-fixed'  
                :class='{show: editor.show}'
                ref='container'
                :style='style'
            >
                <div
                    v-if='editor.show'
                > 
                    <div ref='handle' class='derg-herndle'>
                        <titleBar/>
                    </div>

                    <div 
                    >

                        <div class='bg-white'>
                            <div>
                                <component :is='selectedModePanel'/>
                            </div>
                            <div class='bg-accent-dk d-flex border-top border-5 border-accent-lt'>
                                <mode-buttons/>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div
                    v-if='!editor.show'
                >
                    <button 
                        class="fa fa-chevron-up p-1 btn rounded-0 btn-accent-dk fw-8 p-1 border-0"
                        v-tooltip='"Show"'
                        @click='editor.show = true'
                        
                    />
                </div>

            </div>
        
    </Teleport>
</template>
<script lang='ts' setup>  
import { ref } from "vue"
import dragTest from "./drag-test"

import { useWindowDraggable } from "@/pockets/use/window-draggable"

import { editor } from "./"

import titleBar from "./sections/title-bar/"

import modeButtons from "./modes/buttons.vue"
import add from "./modes/add"
import edit from "./modes/edit"
import remove from "./modes/remove"
import clone from "./modes/clone"
import move from "./modes/drag-drop/move"
import copy from "./modes/drag-drop/copy"
let modePanels = {
    add, 
    edit,
    remove,
    clone,
    move,
    copy
}

let selectedModePanel = $computed( () =>  modePanels[editor.mode] ?? modePanels['edit'] )


let props = defineProps({
    nodes: {
        type: Object
    },
    options: {
        type: Object
    }
})

Object.assign(editor, props)

let container = ref()
let handle = ref()

let { style } = useWindowDraggable( { x: "end", y: "end", container, handle } )

</script>
<style lang='scss'>
    .pockets-node-tree-editor {
        &.show {
            width: 100%;
            max-width:500px;
        }
        label {
            color: var(--bs-accent-dk);
            font-weight:800;
            margin-bottom:10px
        }
    }
</style>