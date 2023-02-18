<template>
    <div class='p-2 loading-container' :loading='loading'>

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

            <nodePlacement 
                :api='editor.active' 
                @before='confirm("before")'
                @after='confirm("after")'
                @inside='confirm("inside")'
            /> 

            <div class='col-12 d-flex'>
                <button 
                    @click='selected = false'
                    class='mx-auto btn btn-danger text-white px-5 fw-8'
                    v-tooltip='"Cancel placing element"'
                >
                    <i class='fa fa-xmark fw-8'></i>
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

let editor = inject('pockets-node-tree-editor')

let selected = $ref(false)
let loading = $ref(false)

let createCopy = async() => {
    
    loading = true
    
    let res = await $pockets
        .crud('node-tree/node')
        .init(selected.node)
        .read(['initialize:<='])

    loading = false
    
    return res

}

let confirm = async (location) => {
    let copy = await createCopy()
    if(!copy) {
        return;
    }
    let map = {
        before: () => {
            return editor.active.add.before(copy)
        },
        after: () => {
            return editor.active.add.after(copy)
        },
        inside: () => {
            return editor.active.add.inside(copy)
        }
    }
    
    let path = await map[location]()
    
    if(path) activateNewNode(path)
}
let activateNewNode = (path) => {
    editor.active = editor.active.getNode(path)
    selected = false
    editor.mode = 'edit'
}

</script>