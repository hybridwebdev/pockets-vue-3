<template lang='pug'>
//- input(
//-     type="color"
//-     @input="editor.chain().focus().setTextStyle( { color: $event.target.value } ).run()"
//-     :value="editor.getAttributes('textStyle').color"
//- )
//- input(
//-     type="color"
//-     @input="editor.chain().focus().setTextStyle( { backgroundColor: $event.target.value } ).run()"
//-     :value="editor.getAttributes('textStyle').backgroundColor"
//- )
//- input(
//-     @input="editor.chain().setTextStyle( { fontSize: $event.target.value } ).run()"
//-     :value="editor.getAttributes('textStyle').fontSize"
//-     type='text'
//- )
</template>
<script lang='ts' setup>
import { inject, computed } from "vue"
import { useInject } from '@/tip-tap/injection-key'

let editor = useInject()
</script>