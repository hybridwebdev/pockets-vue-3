<template lang='pug'>
input(
    type="color"
    @input="editor.chain().focus().setTextStyle({color: $event.target.value}).run()"
    :value="editor.getAttributes('textStyle').color"
)
input(
    type="color"
    @input="editor.chain().focus().setTextStyle({backgroundColor: $event.target.value}).run()"
    :value="editor.getAttributes('textStyle').backgroundColor"
)
| {{ editor.getAttributes('textStyle') }}
</template>
<script lang='ts' setup>
import { inject, computed } from "vue"
let editor = inject('tip-tap-editor')
</script>