<template>
    <slot v-bind="connection"/>
</template>
<script lang='ts'>
import { props, setup } from "./base"
let connection = setup()
export default {
    props,
    setup: (props) => {
        connection.load(props)
        return {
            connection
        }
    }
}
</script>
