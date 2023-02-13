import { reactive } from "vue"
import { $pockets } from "@/pockets"
export let store = {
    $data: reactive({}),
    create(k: string, v: any) {
        if( this.$data.hasOwnProperty(k) ) {
            $pockets.debug.log('Store Already Exists!', k, v)
            return this.use(k)
        }
        this.$data[k] = v
        return this.use(k)
    },
    use(k: string) {
        return this.$data[k] 
    }
} 
