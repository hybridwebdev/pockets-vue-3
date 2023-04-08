<template>

    <Popper
        v-bind="$attrs"
        :theme="theme"
        :target-nodes="getTargetNodes"
        :reference-node="() => $refs.reference"
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
            ref="reference"
            class="v-popper"
        >
            <PopperContent
                :popper-id="popperId"
                :theme="theme"
                :shown="isShown"
                :mounted="true"
                :classes="classes"
                :result='{
                    "x": 100,
                    "y": 300,
                    "placement": "top",
                    "strategy": "fixed",
                    "arrow": false,
                    "transformOrigin": null
                }'
                ref="popperContent"
                class='position-fixed'
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

export default {

  components: {
    Popper: Popper(),
    PopperContent,
  },

  mixins: [
    PopperMethods,
    ThemeClass,
  ],

  inheritAttrs: false,

  props: {
    theme: {
      type: String,
      default () {
        return 'default-theme'
      },
    },
  },

  methods: {
    getTargetNodes () {
      return Array.from(this.$refs.reference.children)
    },
  },

}
</script>