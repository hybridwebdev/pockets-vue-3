<template>
    <div v-bind='$attrs'>
        <div ref="player" :id="playerid"></div>
    </div>
</template>
<script lang='ts'>
import { YoutubeVue3 } from 'youtube-vue3'
export default {
    inheritAttrs: false,
    extends: YoutubeVue3,
    props: {
        width: { 
            type: String, 
            default: "100%" 
        },
    }
}
</script>
<script setup lang='ts'>

import { YoutubeVue3 } from 'youtube-vue3'

</script>