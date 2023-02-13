<template>
    <button
        class='fa fa-chevron-left btn btn-accent-dk p-2 text-white fw-8'
        :class='{active: location == "before"}'
        v-tooltip='"Add Before"'
        :disabled='!api.addSibling'
        @click='setLocation("before")'
    />

    <button
        class='fa fa-plus btn btn-accent-dk text-white fw-8 p-2 flex-fill  border border-2 border-accent-md'
        :class='{active: location == "inside"}'
        v-tooltip='"Add Inside"'
        :disabled='!api.addInside'
        @click='setLocation("inside")'
    />

    <button
        class='fa fa-chevron-right p-2 btn btn-accent-dk text-white fw-8'
        :class='{active: location == "after"}'
        v-tooltip='"Add After"'
        :disabled='!api.addSibling'
        @click='setLocation("after")'
        
    />
</template>
<script lang='ts'>
import { vModel } from "@/pockets/utils/v-model"

let setup = (props, { emit }) => {
    let locationModel = vModel(props, emit, 'location')
    return {
        setLocation(location: string){
            emit(`${location}`)
            locationModel.value = location
        },
    }
}
export default {
    inheritAttrs: false,
    setup,
    props: {
        location: {
            type: [Boolean, String],
            default: false
        },
        api: {
            required: true,
        }  
    }
}
</script>