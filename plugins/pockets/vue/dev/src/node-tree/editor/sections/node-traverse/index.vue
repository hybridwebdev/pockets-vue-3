<template>
    <popup-menu  
        placement='right' 
        :autoHide="false"
    >
        <button class='fa fa-tree p-1 btn btn-accent-dk text-white fw-8'/>
        <template #content>
            <div class='bg-accent-dk border-top border-bottom border-end border-accent-lt border-5 text-white'>
                
                <span class='text-center fw-8 d-block border-bottom border-5 border-accent-lt'>Node Tree</span>

                <div class='p-0'>
                    <div class='d-flex'>
                        <button 
                            class='fa fa-chevron-up btn btn-accent-dk fw-8 mx-auto'
                            v-tooltip='"Parent Node"'
                            :disabled='!triggerParent'
                            @click='triggerParent'
                        />
                    </div>
                    <div>
                        <button 
                            class='fa fa-chevron-left btn btn-accent-dk fw-8'
                            v-tooltip='"Previous Node"'
                            :disabled='!triggerPrev'
                            @click='triggerPrev'
                        />

                         <button 
                            class='fa fa-chevron-down btn btn-accent-dk fw-8 mx-auto'
                            v-tooltip='"First Child Node"'   
                            :disabled='!triggerInside'
                            @click='triggerInside(0)'
                        />

                        <button 
                            class='fa fa-chevron-right btn btn-accent-dk fw-8' 
                            v-tooltip='"Next Node"'
                            :disabled='!triggerNext'
                            @click='triggerNext'
                        />
                    </div>
                </div>

            </div>
        </template>
    </popup-menu>
</template>
<script lang='ts' setup>

import { inject } from "vue"

let editor = inject('pockets-node-tree-editor')

let triggerParent = $computed( () =>{
    if(!editor.active.parent) return false;
    return () => editor.active = editor.active.parent
} )

let triggerInside = $computed(() => {
    if(!editor.active.hasNodes || editor.active.node.nodes.length==0) return false;
    return (index: number = 0) => editor.active = editor.active.getChild(index)
} )
 
let triggerPrev = $computed(() => {

    if(!editor.active.parent) return false
    let index = editor.active.paths.index - 1
    if(index < 0 ) return false
    return () => editor.active = editor.active.parent.getChild(index)
} )

let triggerNext = $computed(() => {

    if(
        !editor.active.parent
        ||
        !editor.active.parent.hasNodes
    ) return false
    let index = editor.active.paths.index + 1
    
    if(index == editor.active.parent.node.nodes.length ) return false
    
    return () => editor.active = editor.active.parent.getChild(index)
})

</script>