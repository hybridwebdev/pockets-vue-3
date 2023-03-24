<template lang='pug'>
button( 
    class='btn btn-accent-dk'
    @click="editor.chain().focus().toggleBold().run()"
    :class="[ { 'active': editor.isActive('bold') }, btnClass ]"

)
    i(class='fa fa-bold')

button( 
    class='btn btn-accent-dk'
    @click="editor.chain().focus().toggleItalic().run()"
    :class="[ { 'active': editor.isActive('italic') }, btnClass ]"

)
    i(class='fa fa-italic')

button( 
    class='btn btn-accent-dk'
    @click="editor.chain().focus().toggleStrike().run()"
    :class="[ { 'active': editor.isActive('strike') }, btnClass ]"

)
    i(class='fa fa-strikethrough')

button(
    @click="editor.commands.setImage({ src: 'https://placehold.co/600x400' })"
) Add Teh Imagzor
</template>
<script lang='ts' setup>
import { inject } from "vue"
let editor = inject('tip-tap-editor')
let btnClass = 'rounded-0 border-0 p-1'
</script>