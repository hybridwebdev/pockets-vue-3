<template lang='pug'>

div(
    class='p-2'
)

    div( 
        v-if='!editor.active || selectedActiveSame'
        class='text-center fw-8'
    ) 
        p(
            v-if='!selected'
            class='m-0'
        ) Select a node to move.
        p(
            v-if='selected'
        ) Select a target to move node to.

    div( 
        v-if='editor.active && !selectedActiveSame' 
    )

        p( 
            v-if='!editor.active.parent && !selected'
            class='text-danger fw-8 text-center m-0' 
        ) This Node cannot be moved!

        div( 
            v-if='!selected && editor.active.parent'
            class='d-flex gap-2'
        )
            button(
                class='btn btn-accent-dk p-2 rounded-0'
                v-tooltip='"Move Node left"'
                :disabled='!editor.active.move.left'
                @click='editor.active.move.left'
            
            ) 
                i(
                    class='fa fa-chevron-left '
                )

            button( 
                @click='selectNode' 
                class='btn btn-outline-confirm mx-auto px-8 py-2 fw-8 text-uppercase rounded-0'
                v-tooltip='"Will move selected node to new location."'
            ) Move

            button(
                class='btn btn-accent-dk p-2 rounded-0'
                v-tooltip='"Move Node right"'
                :disabled='!editor.active.move.right'
                @click='editor.active.move.right'
            ) 
                i(
                    class='fa fa-chevron-right'
                )


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
            class='btn btn-outline-danger mx-auto fw-8 text-uppercase px-8 py-2 rounded-0'
        ) Cancel
        

</template>
<script lang='ts'>
import { setup } from "./setup"
import nodePlacement from "@/node-tree/editor/sections/node-placement/index.vue"
export default {
    components: { nodePlacement },
    setup: () => setup( { removeSelected: true } ) ,
}
</script>
