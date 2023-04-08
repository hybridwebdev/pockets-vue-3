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
    ref 
} from "vue"

let setup = () => {
    let container = ref()
    let getTargetNodes = () =>  Array.from(container.value.children)
    let result = {
        "x": 100,
        "y": 300,
        "placement": "top",
        "strategy": "fixed",
        "arrow": false,
        "transformOrigin": null
    }
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