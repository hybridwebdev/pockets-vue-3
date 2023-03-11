import { defineAsyncComponent } from "vue"
let component = defineAsyncComponent( () => import("./index.vue") )
export let plugin:$pocketsPlugin = {
    createApp: (app: any, $pockets: $pockets) => app.component('pockets-popup-menu', component),
}
 