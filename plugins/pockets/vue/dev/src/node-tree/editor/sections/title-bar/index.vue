<template>
    <div class='bg-accent-dk d-flex align-items-center text-white border-bottom border-5 border-accent-lt'>
        
        <div v-if='editor.active && editor.show' class='d-flex align-items-center'>
            <nodeTraverse/>
            <span
                class='text-capitalize fw-8 '
            >
                {{editor.mode}} - {{editor.active.schema.title ?? editor.active.node.el }} 
            </span>

        </div>
        <div class='ms-auto gap-1 d-flex'>
            <button 
                class='fa fa-save p-1 btn border-0 btn-accent-dk fw-8 p-1 rounded-0'
                v-tooltip='"Save"'
                v-if='editor.show'
                @click='editor.save'
            />
            <button 
                class='fa fa-cogs p-1 btn border-0 btn-accent-dk fw-8 p-1 rounded-0'
                v-tooltip='"Options"'
                v-if='editor.show'
            />
            <button 
                class="fa fa-chevron-down btn border-0 btn-accent-dk fw-8 p-1 rounded-0"
                v-tooltip='"Hide"'
                @click='editor.show = false'
                v-if='editor.show'
            />
            <button 
                class='fa fa-times p-1 btn border-0 btn-accent-dk fw-8 p-1 rounded-0' 
                v-if='editor.show' 
                @click='editor.active = false'
                v-tooltip='"Close"'
                :disabled='!editor.active || editor.modeLocked'
            />
        </div>
    </div>
</template>
<script lang='ts' setup>
import { editor } from "@/node-tree/editor"
import nodeTraverse from "@/node-tree/editor/sections/node-traverse/"
</script>