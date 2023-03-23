<template lang='pug'>
div(
    class='ms-auto d-flex align-items-center pe-1'
    role='button'
    v-if='editor'
)
    select(
        class='form-control p-1 rounded-0 bg-accent-dk border-0 text-white fw-8'
        @change='change'
    )
        option(
            v-for='(option, i) in options'
            :selected='option.isActive'
            :value='i'
        ) {{ option.text }}

</template>
<script lang='ts' setup>
import { inject, computed } from "vue"

let editor = inject('tip-tap-editor')

let change = ($e) => {
    let v = options.value[$e.target.value] ?? false
    if(v && v.select && typeof v.select == 'function') v.select()
}

let makeHeadingOption = (level: number ) => ( {
    text: `H${level}`,
    isActive:  editor.isActive( 'heading', { level } ),
    select: () => editor.chain().focus().toggleHeading({ level } ).run()
} )

let options = computed( () => [
    {
        text: "P",
        isActive: editor.isActive('p'),
        select: () => editor.chain().focus().setParagraph().run()
    },
    makeHeadingOption(1),
    makeHeadingOption(2),
    makeHeadingOption(3),
    makeHeadingOption(4),
    makeHeadingOption(5),
    makeHeadingOption(6)
] )

</script>