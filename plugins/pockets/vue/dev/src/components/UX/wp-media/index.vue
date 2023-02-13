<template>

    <div 
        v-bind='$attrs'  
        class='loading-container'
        :loading='connection.loading'
    >

        <div 
            class='grid columns-5 gap-1'
            v-if='connection.results'
        >
            <button 
                v-for='result in connection.results.items' 
                class='d-flex position-relative thumbnail active btn btn-primary-md p-0 rounded-0'
                :class='{ selected: selectedIDS.selected.includes(result.ID) }'
                @click='selectedIDS.select(result.ID)'
                :disabled='!selectedIDS.select'
            >
                <img 
                    :src='result.url' 
                    class='img-fluid m-auto' 
                    style='height:100px;object-fit:cover'
                >
                <i 
                    class="fa fa-check selected-icon position-absolute end-0 bottom-0 icon bg-accent-dk text-white"
                    v-if='selectedIDS.selected.includes(result.ID)'
                />
            </button>
        </div>

        <controls class='mt-1'/>
 
    </div>

</template>
<script lang='ts'>
import { setup, props } from "./setup"
import controls from "./controls.vue"

export default {
    setup(props, ctx){
        let { connection, selectedIDS, query } = setup(props, ctx)
        return {
            connection, selectedIDS, query
        }
    },
    props,
    components: {
        controls
    }
}
</script>
<style scoped lang='scss'>
    .thumbnail {
        border:5px solid transparent;
        &.selected {
            border-color: var(--bs-accent-dk)
        }
        .icon {
            padding: 5px;
        }
    }
</style>