<template lang='pug'>

div(
    class='p-2'
)
    div( 
        v-if='!editor.active'
        class='text-center fw-8'
    ) 
        p(
            v-if='!selected'
            class='m-0'
        ) Select a node to copy.
        p(
            v-if='selected'
        ) Select a target to copy node to.
    div( 
        v-if='editor.active' 
    )
        p( 
            v-if='!editor.active.parent && !selected'
            class='text-danger fw-8 text-center m-0' 
        ) This Node cannot be copied!
        div( 
            v-if='!selected && editor.active.parent'
            class='grid columns-1 gap-2'
        )
            button( 
                @click='selectNode' 
                class='btn btn-outline-confirm mx-auto px-8 py-2 fw-8 text-uppercase'
                v-tooltip='"Will create a copy of node wherever you place it."'
            ) Copy
        div( 
            v-if='selected' 
        )
            p(
                class='text-center fw-8'
            ) Select a location to copy selected node to.
            
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
            class='btn btn-outline-danger mx-auto fw-8 text-uppercase px-8 py-2'
        ) Cancel
        

</template>
<script lang='ts'>
import { setup } from "./setup"
import nodePlacement from "@/node-tree/editor/sections/node-placement/index.vue"
export default {
    components: { nodePlacement },
    setup: () => setup( { removeSelected: false } ) ,
}
</script>
