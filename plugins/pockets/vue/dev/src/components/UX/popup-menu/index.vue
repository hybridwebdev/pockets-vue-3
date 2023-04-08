<script>
import { PopperWrapper } from 'floating-vue'
export default {
  vPopperTheme: 'popup-menu',
  ...PopperWrapper,
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
    .v-popper__popper--no-positioning {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
    }
        
    .v-popper__popper--no-positioning .v-popper__backdrop {
        display: block;
        background: var(--bs-backdrop)
    }

    .v-popper__popper--no-positioning .v-popper__wrapper {
        margin: auto auto 0 auto;
        pointer-events: auto;
    }

</style>