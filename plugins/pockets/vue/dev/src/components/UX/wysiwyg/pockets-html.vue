<template>
    <pockets-wysiwyg v-model='$attrs.innerHTML' v-bind='testa'/>
</template>
<script>
export default {
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