<template>

    <Popper
        v-bind="$attrs"
        :theme="'theme'"
        :target-nodes="getTargetNodes"
        :reference-node="() => $refs.container"
        :popper-node="() => $refs.popperContent.$el"
        :triggers='[]'
        placement='auto'
        :shown='true'
        :autoHide='false'
        v-slot="{
            popperId,
            classes,
            isShown,
            theme
        }"
    >
        <div
            ref="container"
            class="v-popper"
        >
            <PopperContent
                ref="popperContent"
                class='position-fixed'
                :popper-id="popperId"
                :theme="'theme'"
                :shown="isShown"
                :mounted="true"
                :classes="classes"
                :result='result'
            >
                <slot/>
            </PopperContent>
        </div>
    </Popper>

</template>

<script>

import {
  Popper,
  PopperContent,
  PopperMethods,
  ThemeClass
} from 'floating-vue'

import { 
    ref, 
    inject,
    computed 
} from "vue"

import { 
    useCoords 
} from "./use-coords"

import { injectEditor } from '@/tip-tap/inject-editor'

let setup = () => {
    let editor = injectEditor()

    let coords = useCoords(editor)
    let container = ref()
    let getTargetNodes = () =>  Array.from(container.value.children)
    let result = computed(() => {
        
        let state = {
            "x": 0,
            "y": 0,
            "placement": "bottom",
            "strategy": "fixed",
            "arrow": false,
            "transformOrigin": null,
            flip: true
        }
        
        if(coords) {
            return {
                ...state,
                x: coords.value.left,
                y: coords.value.top + coords.value.height + 10,
            }
        }
        
        return state
    })
    return {
        container,
        getTargetNodes,
        result,
    }
}

export default {
    setup,
    components: {
        Popper: Popper(),
        PopperContent,
    },

}
</script>