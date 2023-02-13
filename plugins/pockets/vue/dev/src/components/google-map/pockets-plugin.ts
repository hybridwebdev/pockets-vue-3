import { defineAsyncComponent } from "vue"
let map = defineAsyncComponent( () => import("./map.vue") )
let marker = defineAsyncComponent( () => import("./marker.vue") )
let autocomplete = defineAsyncComponent( () => import("./auto-complete.vue") )
let loader = defineAsyncComponent( () => import("./loader.vue") )
export let plugin:$pocketsPlugin = {
    
    createApp(app: any, $pockets: $pockets){
        app.component('google-maps-loader', loader )
        
        app.component('google-maps-map', map )
        app.component('google-maps-marker', marker )
        app.component('google-maps-auto-complete', autocomplete )


    },

}
 