
import { tests } from "./"

export let plugin:$pocketsPlugin = {
    init(app: any, $pockets: $pockets){ 
        tests()
    }
}