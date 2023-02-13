export let plugin:$pocketsPlugin = {
    init(app: any, $pockets: $pockets){ 
        $pockets.customElement.create('pockets-app')
    }
}