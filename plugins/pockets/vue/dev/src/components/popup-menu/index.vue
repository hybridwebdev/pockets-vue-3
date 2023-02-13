<template>
    <VMenu popperClass='popup-menu' v-bind='$attrs'>
        <slot></slot>
        <template #popper>
            <slot name='content'/>
        </template>
    </VMenu>
</template>
<style lang='scss'>
    .v-popper--theme-dropdown.popup-menu { 
        .v-popper__inner {
            border: 0px;
            border-radius:0px
        }
        .v-popper__arrow-container {
            display: none;
        }
    }

</style>