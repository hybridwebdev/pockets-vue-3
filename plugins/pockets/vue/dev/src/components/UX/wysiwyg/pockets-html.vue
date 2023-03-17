<template>
    <div
        v-bind='filteredAttrs'
    >
        {{test}}
        <pockets-wysiwyg
            v-model='test' 
        />
            <pockets-wysiwyg
            v-model='test' 
        />
            <pockets-wysiwyg
            v-model='test' 
        />
    </div>
</template>
<script>
import { inject } from "vue"
export default {
    data: () => ({
        test: "Hello world"
    }),
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