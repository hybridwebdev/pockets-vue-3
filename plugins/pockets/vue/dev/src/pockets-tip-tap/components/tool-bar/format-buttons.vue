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

</template>
<script lang='ts' setup>
import { injectEditor } from '@/pockets-tip-tap/inject-editor'
let editor = injectEditor()
let btnClass = 'rounded-0 border-0 p-1'
</script>