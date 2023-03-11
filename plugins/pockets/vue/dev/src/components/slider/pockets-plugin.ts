import { defineAsyncComponent } from "vue"

import swiper from "@/pockets/utils/swiper"

let component = defineAsyncComponent( () => import("./index.vue") )

export let plugin:$pocketsPlugin = {
    createApp(app: any, $pockets: $pockets) {
        app.component('pockets-slider', component)
        app.use(swiper)
    }
}
