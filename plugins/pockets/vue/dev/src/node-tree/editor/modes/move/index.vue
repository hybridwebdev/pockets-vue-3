<template lang='pug'>

div(
    class='p-2'
)
    div( 
        v-if='!editor.active'
        class='text-center fw-8'
    ) {{ !selected ? "Select a node to move." : "Select a location to move node to."}}

    div( 
        v-if='editor.active' 
        class='pt-2'
    )
        p( 
            v-if='!editor.active.parent && !selected'
            class='text-danger fw-8 text-center m-0' 
        ) This Node cannot be moved!

        div( 
            v-if='!selected && editor.active.parent'
            class='grid columns-1 gap-2'
        )
            p(
                class='text-center fw-8 m-0'
            ) Are you sure you want to move this item?
            button( 
                @click='selectNode' 
                class='btn btn-accent-dk mx-auto px-8 py-2 fw-8 text-uppercase'
            ) 
                | Move
        
        div( 
            v-if='selected' 
        )
            p(
                class='text-center fw-8'
            ) Select a location to place selected node!
            
            div(
                class='grid columns-3 gap-2 mb-2'
            )
                nodePlacement( 
                    :api='adder'
                    @before="confirm('before')"
                    @after="confirm('after')"
                    @inside="confirm('inside')"
                )
    
    div(
        v-if='selected' 
        class='d-flex'
    )
        button( 
            @click='cancel' 
            class='btn btn-danger mx-auto text-white fw-8 text-uppercase px-8 py-2'
        ) 
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
