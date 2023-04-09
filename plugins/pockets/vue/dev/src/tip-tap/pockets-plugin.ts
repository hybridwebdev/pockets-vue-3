import { defineAsyncComponent } from "vue"
let editor = defineAsyncComponent( () => import("./components/editor/index.vue") )
let pocketsHtml = defineAsyncComponent( () => import("./components/pockets-html/index.vue") )
export let plugin:$pocketsPlugin = {
    createApp: (app: any, $pockets: $pockets) => {
        app.component('pockets-wysiwyg', editor)
        app.component('pockets-html', pocketsHtml)
    },
}
 