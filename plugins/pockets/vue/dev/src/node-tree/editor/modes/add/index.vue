<template>
    
    <div 
        v-if='!editor.active'
        class='p-2 fw-8 text-center'
    >
        Select a node to add to.
    </div>
    
    <div 
        class='p-2 loading-container' 
        :loading='loading'
        v-if='editor.active'
    >

        <div v-show='!selected' class='gap-1 grid columns-1'>
            
            <div class='text-center col-12 fw-8'>
                Select An element
            </div>
            
            <pockets-node-tree-node-selector v-model:selected='selected'/>

        </div>

        <div v-if='selected' class='d-flex align-items-center flex-wrap gap-1'>

            <span 
                class='col-12 text-center fw-8'
            >
                Select A location to add 
                <span class='text-accent-dk fw-8'>
                    {{selected.title}}
                </span>
            </span>
            <div class='grid columns-3 col-12 gap-2'>
                <nodePlacement 
                    :api='editor.active' 
                    @before='confirm("before")'
                    @after='confirm("after")'
                    @inside='confirm("inside")'
                /> 
            </div>

            <div class='col-12 d-flex'>
                <button 
                    @click='selected = false'
                    class='mx-auto btn btn-outline-danger px-8 py-2 fw-8'
                    v-tooltip='"Cancel placing element"'
                >
                    CANCEL
                </button>
            </div>

        </div>
    </div>
</template>
<script lang='ts' setup>
import { $pockets } from "@/pockets/"
import { inject, ref, reactive, nextTick } from "vue"
import pocketsNodeTreeNodeSelector from "@/node-tree/editor/sections/node-list/node-selector"
import nodePlacement from "@/node-tree/editor/sections/node-placement"

import { editor } from "@/node-tree/editor"

let selected = $ref(false)
let loading = $ref(false)

let createCopy = async(node) => {
    
    loading = true
    
    let res = await $pockets
        .crud('node-tree/node')
        .init(node)
        .read(['initialize:<='])

    loading = false
    
    return res

}

let confirm = async (location) => {
    let copy = await createCopy(selected.node)
    selected = false
    if(!copy) {
        return;
    }
    let fn = editor.active.add[location] ?? false
    if(typeof fn != 'function') {
        return;
    }
    let node = fn(copy)
    if(node) activateNewNode(node)
}
let activateNewNode = (node) => {
    editor.active = editor.active.getNodeApi(node)
}

</script>