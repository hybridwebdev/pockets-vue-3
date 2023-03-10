import { watch, computed } from 'vue'
import { useDraggable, useElementSize, useWindowSize  } from '@vueuse/core'

export let useWindowDraggable = (props) => {

    let hander = event => event.preventDefault()
    
    let elSize = useElementSize(props.container)
    
    let windowSize = useWindowSize({
        includeScrollbar: false
    })

    let boundaries = computed( () => {
        return {
            x: {
                start: 0,
                end: windowSize.width.value - elSize.width.value
            },
            y: {
                start: 0,
                end: windowSize.height.value - elSize.height.value
            }
        }
    } )

    let { x, y, style } = useDraggable(props.container, {
        /**
            Prevent elements from being highlighted while dragging
        */
        onStart: () =>  window.addEventListener("selectstart", hander) ,
        onEnd: () => window.removeEventListener("selectstart", hander),

        stopPropagation: true,
        handle: props.handle,
        initialValue: { 
            x: boundaries.value.x[props.x], 
            y: boundaries.value.y[props.y], 
        },
    } )

    let validateY = () => {
        if(y.value < boundaries.value.y.start ) {
            y.value = boundaries.value.y.start
        }
        if(y.value > boundaries.value.y.end ) {
            y.value = boundaries.value.y.end
        }
    }

    let validateX = () => {
        if(x.value < boundaries.value.x.start ) {
            x.value = boundaries.value.x.start
        }
        if(x.value > boundaries.value.x.end ) {
            x.value = boundaries.value.x.end
        }
    }

    watch([ x, elSize.width ], validateX)
    watch([ y, elSize.height ], validateY)

    return {
        style
    }

}
