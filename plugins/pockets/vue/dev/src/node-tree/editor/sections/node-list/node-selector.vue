<template>
    <div class='grid columns-1 gap-1 loading-container' :loading='loading' >
        <div class='d-flex gap-1'>
            <input 
                v-model='filterText' 
                class='form-control' 
                placeholder='Enter text to filter results'
            />
            <button 
                class='btn btn-danger text-white fa fa-times fw-8' 
                @click='filterText = ""'
                v-tooltip='"Clear Search"'
            />
        </div>
        <div class='grid columns-3 gap-1 col-12'>
            <button 
                v-for='node in nodeList' 
                @click='select(node)'
                class='p-1 btn btn-accent-dk d-flex gap-1 align-items-center fw-8 border-0 rounded-0'
                :class='isSelected(node)'
            >
                {{node.title}}
            </button>
        </div>
        <span v-if='nodeList.length ==0' class='fw-8'>
            No elements found containing {{filterText}}.
        </span>
    </div>
</template>
<script>

import {setup, props} from "./setup"

export default {
    setup, 
    props
}
</script>
