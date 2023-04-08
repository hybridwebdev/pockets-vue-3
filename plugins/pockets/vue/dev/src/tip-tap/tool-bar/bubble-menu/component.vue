<template lang='pug'>
pockets-popup-menu(
  class='d-flex p-1 bg-accent-dk align-items-center'
  :triggers='[]'
  :shown="true"
  placement='top'
  theme='tip-tap-menu'
  :positioning-disabled='false'
)
  template(#popper)
    slot()
</template>
<script lang='ts'>
import { 
  inject,
  onBeforeUnmount,
  onMounted,
} from "vue"

let setup = () => {
  let editor = inject('tip-tap-editor')
  onMounted(() => {
  })
}
export default {
  setup
}

</script>
<style lang='scss'>
.v-popper--theme-tip-tap-menu {
  transform: translate3d(0, 0, 0px) !important;
  top: 100px;
}
</style>