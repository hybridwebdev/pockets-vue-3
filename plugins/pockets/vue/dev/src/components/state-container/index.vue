<template>
    <slot :state='state'/>
</template>
<script lang='ts'>
import { reactive, useAttrs} from 'vue'
/**
    All declared attributes are used to create a reactive which is passed to a scoped slot. 
    So for example a user could create an element: 
    <state-container foo='test' #default='data'>
        {{data.foo}} <- output is test
    </state-container>
*/

let setup = () => {
    return {
        state: reactive( { ...useAttrs() } )
    }
}

export default {
    inheritAttrs: false,
    setup
}


</script>
