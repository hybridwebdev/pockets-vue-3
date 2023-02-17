<template>

    <button 
        class="fa-regular fa-pen-to-square btn border-0 btn-accent-dk fw-8 p-1"
        :class="{active: editor.mode=='edit'}"
        v-tooltip='"Edit Item"'
        @click='editor.mode = "edit"'
        :disabled='editor.newActive.editFields.length == 0'
    />

    <button 
        class="fa-regular fa-plus btn border-0 btn-accent-dk fw-8 p-1"
        :class="{active: editor.mode=='add'}"
        v-tooltip='"Add Item"'
        @click='editor.mode = "add"'
    />

     <button 
        class='fa fa-solid fa-eraser btn border-0 btn-accent-dk fw-8 p-1' 
        :class="{active: editor.mode=='remove'}"
        v-tooltip="'Remove Mode'"
        :disabled='!editor.newActive.remove.self'
        @click='editor.mode = "remove"'
    />

    <button 
        class='fa fa-solid fa-clone btn border-0 btn-accent-dk fw-8 p-1' 
        :class="{active: editor.mode=='clone'}"
        @click='editor.mode="clone"' 
        :disabled='!editor.newActive.clone.self'
        v-tooltip='"Clone Item"'
    />

    <!-- <button 
        class='fa fa-solid fa-scissors btn border-0 btn-accent-dk fw-8 p-1' 
        :class="{active: editor.mode=='cut'}"
        @click='editor.mode="cut"' 
        :disabled='!editor.active.hasParent'
        v-tooltip='"Cut Item"'
    /> -->

    <!-- <button 
        class='fa fa-solid fa-copy btn border-0 btn-accent-dk fw-8 p-1' 
        :class="{active: editor.mode=='copy'}"
        @click='editor.mode = "copy"' 
        :disabled='!editor.active.hasParent || editor.selectedNodes.length > 0'
        v-tooltip='"Copy Item"'
    /> -->
</template>
<script lang='ts' setup>

import { inject } from "vue"

let editor = inject('pockets-node-tree-editor')

</script>