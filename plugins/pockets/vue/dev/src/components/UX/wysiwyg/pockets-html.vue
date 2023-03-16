<template>
    <pockets-wysiwyg v-model='nodeApi.node.props.innerHTML' v-bind='testa'/>
</template>
<script>
import { inject } from "vue"
export default {
    inject: ['nodeApi'],
    inheritAttrs: false,
    data: () => ({test: "Hello world"}),
    computed: {
        testa(){
            let { innerHTML, ...rest} = this.$attrs
            return rest
        }
    }
}
</script>