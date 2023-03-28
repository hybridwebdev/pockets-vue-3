<template lang='pug'>
input(
    type="color"
    @input="editor.chain().focus().setColor($event.target.value).run()"
    :value="editor.getAttributes('textStyle').color"
)
</template>
<script lang='ts' setup>
import { inject, computed } from "vue"
let editor = inject('tip-tap-editor')
</script>