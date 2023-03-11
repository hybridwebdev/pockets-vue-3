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
        background: var(--bs-back-drop)
    }

    .v-popper__popper--no-positioning .v-popper__wrapper {
        width: 100%;
        pointer-events: auto;
        transition: transform .15s ease-out;
    }

    .v-popper__popper--no-positioning.v-popper__popper--hidden .v-popper__wrapper {
        
    }
</style>