<template>
    <Teleport to='body'>
        
        <div
            class='position-fixed bottom-0 end-0 border border-5 border-accent-lt pockets-node-tree-editor bg-accent-dk'  
            :class='{open: editor.show}'
        >
            <div
                v-if='editor.show'
            > 
                <titleBar/>

                <div 
                >

                    <div class='bg-white d-flex'>
                        <div class='bg-accent-dk d-flex flex-column border-end border-5 border-accent-lt'>
                            <mode-buttons/>
                            <nodeTraverse/>
                        </div>
                        <div class='flex-fill'>
                            <component :is='selectedModePanel'/>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div
                v-if='!editor.show'
            >
                <button 
                    class="fa fa-window-maximize p-1 btn rounded-0 btn-accent-dk fw-8 p-1"
                    v-tooltip='"Show"'
                    @click='editor.show = true'
                    
                />
            </div>

        </div>

    </Teleport>
</template>
<script lang='ts' setup>  

import { provide } from "vue"
import { editor } from "./"

import titleBar from "./sections/title-bar/"
import nodeTraverse from "./sections/node-traverse/"

import modeButtons from "./modes/buttons.vue"
import add from "./modes/add"
import edit from "./modes/edit"
import remove from "./modes/remove"
import clone from "./modes/clone"

import move from "./modes/move"
let modePanels = {
    add, 
    edit,
    remove,
    clone,
    move
}

let selectedModePanel = $computed( () =>  modePanels[editor.mode] ?? modePanels['edit'] )

provide('pockets-node-tree-editor', editor)

let props = defineProps({
    nodes: {
        type: Object
    },
    options: {
        type: Object
    }
})

Object.assign(editor, props)

</script>
<style lang='scss'>
    .pockets-node-tree-editor {
        &.open {
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