<template>
    <Teleport 
        :to='teleport' 
        v-if='open === true' 
        :disabled='!teleport'
    >
        <div v-bind="$attrs" class='pockets-modal' @click.self="close">
            <slot v-bind="api"></slot>
        </div>
    </Teleport>
</template>
<script setup lang='ts'>
    
    import { computed} from 'vue'
    
    let emit = defineEmits(['update:open'] )

    let props = defineProps( {
        teleport: {
            type: [String, Boolean],
            default: 'body'
        },
        open: {
            type: Boolean,
            default: false
        }
    } )

    let open = computed({ 
        get: () => props.open, 
        set: v => emit('update:open', v) 
    }) 

    let close = e => open.value = false
    let api = {
        close
    }
</script>
<style lang='scss'>
    .pockets-modal {
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background: rgba(0,0,0, .5);
    }
</style>