<template>
    <pockets-wysiwyg
        :editable='nodeApi.editor.active && nodeApi.paths.full == nodeApi.editor.active.paths.full'
        v-model='nodeApi.node.props.innerHTML' 
        v-bind='filteredAttrs'
    />
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