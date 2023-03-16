<template>
    <pockets-wysiwyg 
        v-if='nodeApi.editor.active && nodeApi.paths.full == nodeApi.editor.active.paths.full'
        v-model='nodeApi.node.props.innerHTML' 
        v-bind='filteredAttrs'
    />
    <div 
        v-else
        v-bind='$attrs'
    >
    </div>
</template>
<script>
import { inject } from "vue"
export default {
    inject: ['nodeApi'],
    inheritAttrs: false,
    computed: {
        filteredAttrs(){
            let { innerHTML,  ...rest} = this.$attrs
            return rest
        }
    }
}
</script>