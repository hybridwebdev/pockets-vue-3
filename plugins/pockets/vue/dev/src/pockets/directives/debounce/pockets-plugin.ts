import {debounceDirective} from '@/pockets/utils/debounce'

export let plugin:$pocketsPlugin = {
    createApp(app: any, $pockets: $pockets){
        app.directive('debounce', debounceDirective)
    },
}

