<template>
  <Popper
    ref="popper"
    v-slot="{
      popperId,
      isShown,
      shouldMountContent,
      skipTransition,
      autoHide,
      hide,
      handleResize,
      onResize,
      classes,
      result,
    }"
    v-bind="$attrs"
    :theme="theme"
    :target-nodes="getTargetNodes"
    :reference-node="() => $refs.reference"
    :popper-node="() => $refs.popperContent.$el"
    :triggers='[]'
    placement='auto'
    :shown='true'
    :autoHide='false'
  >
    <div
      ref="reference"
      class="v-popper"
      :class="[
        {
          'v-popper--shown': isShown,
        },
      ]"
    >
        <slot/>
        <PopperContent
            ref="popperContent"
            :popper-id="popperId"
            :theme="theme"
            :shown="isShown"
            :mounted="shouldMountContent"
            :skip-transition="skipTransition"
            :auto-hide="autoHide"
            :handle-resize="handleResize"
            :classes="classes"
            :result="result"
            @hide="hide"
            @resize="onResize"
        >
            <slot
                name='popper'
            />
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
  name: 'VPopperWrapper',

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
        return 'terst'
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