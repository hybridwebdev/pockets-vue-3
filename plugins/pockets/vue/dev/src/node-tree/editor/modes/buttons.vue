<template>

    <button 
        class="fa-regular fa-pen-to-square"
        :class="[{active: editor.mode=='edit'}, baseClass]"
        v-tooltip='"Edit"'
        @click='editor.mode = "edit"'
        :disabled='editor.modeLocked'
    />

    <button 
        class="fa-regular fa-plus"
        :class="[{active: editor.mode=='add'}, baseClass]"
        v-tooltip='"Add"'
        @click='editor.mode = "add"'
        :disabled='editor.modeLocked'
    />

     <button 
        class='fa fa-solid fa-eraser' 
        :class="[{active: editor.mode=='remove'}, baseClass]"
        v-tooltip="'Remove'"
        :disabled='editor.modeLocked'
        @click='editor.mode = "remove"'
    />

    <button 
        class='fa fa-solid fa-clone' 
        :class="[{active: editor.mode=='clone'}, baseClass]"
        @click='editor.mode="clone"' 
        :disabled='editor.modeLocked'
        v-tooltip='"Clone"'
    />

    <button 
        class='fa fa-crosshairs' 
        :class="[{active: editor.mode=='move'}, baseClass]"
        @click='editor.mode = "move"' 
        :disabled='editor.modeLocked && editor.mode!="move"'
        v-tooltip='"Move"'
    />

    <button 
        class='fa fa-solid fa-copy' 
        :class="[{active: editor.mode=='copy'}, baseClass]"
        @click='editor.mode="copy"' 
        :disabled='editor.modeLocked && editor.mode!="copy"'
        v-tooltip='"Copy"'
    />

</template>
<script lang='ts' setup>
import { editor } from "@/node-tree/editor"
let baseClass = 'btn border-0 btn-accent-dk fw-8 p-2 rounded-0 flex-grow-1'
</script>
