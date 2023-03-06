<template>

    <div class='flex-fill grid columns-1 gap-2'>
    
        <div 
            v-if='!editor.active' 
            class='p-2 fw-8 text-center'
        >
            Select a node to edit.
        </div>
        
        <div v-if='editor.active && filteredFields.length!=0'>
            <div class='grid columns-3 gap-0 p-0 bg-accent-dk border-bottom border-5 border-accent-lt'>
                <button 
                    v-for='group in filteredGroups' 
                    class='btn btn-accent-dk fw-8 border-0 rounded-0'
                    @click='activeGroup = group'
                    :class='{ active: activeGroup == group }'
                >
                    {{group}}
                </button>
            </div>

            <render-html
                :innerHTML='fieldsHtml' 
                :state='editor.active' 
                class='p-2'
            />

        </div>
        
        <span v-if='editor.active && filteredFields.length==0' class='text-center fw-8 p-2'>
            This Node does not have any editable properties.
        </span>

    </div>
</template>
<script lang='ts' setup>
let test = ref([])

import { inject, watch, ref } from "vue"

import { editor } from "@/node-tree/editor/"

let filters = {
    group: (node) => {
        return node.group == activeGroup
    }
}

let filteredFields = $computed( () => editor.active.editFields.filter( filters.group ) )

let fieldsHtml = $computed( () => filteredFields.reduce((acc, e) => acc+e.content, '' ) )

let filteredGroups = $computed( () => {
    if(!editor.active.editFields) return []
    return editor.active.editFields
        .map(e => e.group )
            .filter((value, index, self)  => self.indexOf(value) === index)
                .sort( (a, b) => a.localeCompare(b) )
        
} )

let activeGroup = $ref(false)

watch(() => filteredGroups, () => {
    
    if(
        filteredGroups.includes(activeGroup)
        && activeGroup
    )  return;

    if(filteredGroups.length == 0) {
        activeGroup = false
        return;
    }

    activeGroup = filteredGroups[0]

}, { immediate: true } )
</script>