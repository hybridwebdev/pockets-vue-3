<script>
import { PopperWrapper } from 'floating-vue'
export default {
  ...PopperWrapper,
  vPopperTheme: 'popup-menu',
}
</script>
<style lang='scss'>
    .v-popper--theme-popup-menu { 
        .v-popper__inner {
            border: 0px;
            border-radius:0px
        }
        .v-popper__arrow-container {
            display: none;
        }
    }

</style>