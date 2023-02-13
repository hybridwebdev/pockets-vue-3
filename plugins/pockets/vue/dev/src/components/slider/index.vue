<template>
    <div>
        <slot v-bind='api'/>
    </div>
</template>
<script setup lang='ts'>
    import { rotate } from "@/pockets/utils/dot-prop/array"
    import { createTimer } from "@/pockets/utils/create-timer"

    import { ref, computed, onMounted, onUnmounted } from "vue"
    
    let props = defineProps( {
        interval: {
            /**
                How often slide shifts automatically.
                If set to 0, slides will only shift when called by one of the provided methods.
                Should be in MS eg 1000 = 1s
            */
            type: [Number, String],
            default: 0
        },
        slides: {
            type: Array,
            default: () => [],
            required: true
        },
        slideCount: {
            type: Number,
            default: 1
        }
    } )

    let { slides } = props

    let $active = ref(0)
    
    let active = computed( {
        get: () => $active.value,
        set: value => {
            /**
                Boundary Check
            */
            let slide_count = slides.length -1
            if(value > slide_count) value = 0
            if( value < 0 )  value = slide_count
            $active.value = value
            /**
                Re-firing timer every time slide changes to make sure 
                the slide won't just immediately change after a user interaction.
            */
            timer.start()
        }
    } )

    let back = () => [...Array(props.slideCount).keys()].forEach(e => active.value--) 
    let forward = () => [...Array(props.slideCount).keys()].forEach(e => active.value++) 

    let jump = (count: number) => active.value = count
    let api = {
        jump, 
        back, 
        forward,
        slides,
        get slide(){
            return slides[active.value]
        },
        getSlides(count:number = props.slideCount, offset: number = 0){
            return rotate(slides, active.value + offset).slice(0, count)
        },
        rotate(forward: boolean = true) {
            forward ? api.forward() : api.back()
        }
    } 
    
    let timer = createTimer( api.forward, props.interval as number )

    onUnmounted( timer.stop )
    onMounted( timer.start )

</script>
