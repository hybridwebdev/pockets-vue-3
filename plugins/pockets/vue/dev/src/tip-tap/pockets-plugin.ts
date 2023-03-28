import { defineAsyncComponent } from "vue"
let component = defineAsyncComponent( () => import("./tip-tap.vue") )
let pocketsHtml = defineAsyncComponent( () => import("./pockets-html.vue") )
export let plugin:$pocketsPlugin = {
    createApp: (app: any, $pockets: $pockets) => {
        
        app.config.unwrapInjectedRef = true

        app.component('pockets-wysiwyg', component)
        app.component('pockets-html', pocketsHtml)
    },
}
 