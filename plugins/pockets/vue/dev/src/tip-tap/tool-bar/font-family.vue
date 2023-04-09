<template lang='pug'>
div(
    class='ms-auto d-flex align-items-center'
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
import { injectEditor } from '@/tip-tap/inject-editor'

let editor = injectEditor()

let change = ($e) => {
    let v = options.value[$e.target.value] ?? false
    if(v && v.select && typeof v.select == 'function') v.select()
}

let makeOption = (fontFamily: string ) => ( {
    text: fontFamily,
    isActive:  editor.isActive('textStyle', { fontFamily } ),
    select: () => editor.chain().focus().setTextStyle( { fontFamily } ).run()
} )

let options = computed( () => [
    {
        text: "None",
        isActive:  editor.isActive('textStyle', { fontFamily: undefined } ),
        select: () => editor.chain().focus().unsetFontFamily().run()
    }, 
    makeOption('Inter')
] )

</script>