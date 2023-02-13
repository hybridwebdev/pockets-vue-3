import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

export let plugin:$pocketsPlugin = {
    createApp(app: any, $pockets: $pockets){
        app.use(FloatingVue, {
            strategy: "fixed"
        })
    },
}

