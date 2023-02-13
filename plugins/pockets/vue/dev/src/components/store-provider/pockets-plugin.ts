import { defineAsyncComponent } from "vue"
let provider = defineAsyncComponent( () => import("./provider.vue") );
let create = defineAsyncComponent( () => import("./create.vue") );
export let plugin:$pocketsPlugin = {
    createApp(app: any, $pockets: $pockets){
        app.component('store-provider', provider )
        app.component('store-create', create )
    },
}
 