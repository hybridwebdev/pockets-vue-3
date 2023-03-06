<template lang='pug'>

div(
    class='p-2'
)
    div( 
        v-if='!editor.active'
        class='text-center fw-8'
    ) {{ !selected ? "Select a node to move." : "Select a location to move node to."}}

    div( v-if='editor.active' )
        div( 
            v-if='!editor.active.parent && !selected'
            class='text-danger fw-8 fs-18 text-center' 
        ) This Node cannot be moved

        div( 
            v-if='!selected && editor.active.parent'
            class='d-flex'
        )
            button( 
                @click='selectNode' 
                class='btn btn-accent-dk mx-auto px-2 py-1'
            ) 
                i(class='fa fa-crosshairs me-1')
                | Move Element
        
        div( 
            v-if='selected' 
            class='grid columns-3 gap-1'
        )
            nodePlacement( 
                :api='adder'
                @before="confirm('before')"
                @after="confirm('after')"
                @inside="confirm('inside')"
            )
    
    div(
        v-if='selected' 
        class='d-flex pt-1'
    )
        button( 
            @click='cancel' 
            class='btn btn-danger mx-auto text-white fw-8 text-uppercase px-2 py-1'
        ) 
            i(class='fa fa-times me-1')
            | Cancel Move
        

</template>
<script lang='ts'>
import { setup } from "./setup"
import nodePlacement from "@/node-tree/editor/sections/node-placement/index.vue"
export default {
    components: { nodePlacement },
    setup
}
</script>
