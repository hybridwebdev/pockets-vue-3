// @ts-nocheck
import parser from "route-parser"
import { computed, reactive } from "vue"
let fauxRouter = (path:string, defaultParams: object, onChange: Function = () => {}) => {
    
    let pushState = function() {
        history.pushState.apply(history, arguments)
    };

    let route = new parser(path)

    let router = new URL(window.location)

    let $params = computed( () => { 
        let match = route.match(router.pathname)
        return match ? match : { ...defaultParams } // avoids mutation
    })

    let params = new Proxy($params.value, {
        get(target, key) {
            return target[key] ?? null
        },
        set(target, key, value){
            value = value !='' ? value :  null
            if(value) Reflect.set(target, key, value)
            if(!value) {
                delete target[key]
            }
            if(Object.keys(target).length === 0) {
                Object.assign(target, {...defaultParams } ) // avoids mutation
            }
            
            router.pathname = route.reverse(target) 
            api.pushState({}, '', router)

            onChange.call(this, 'params', api, key)

            return true;
        }
    })

    let $query = computed( () => Object.fromEntries( new URLSearchParams(router.search) ) )

    let query = new Proxy($query.value, {
        get(target, key) {
            return target[key] ?? null
        },
        set(target, key, value){
            value = value !='' || !isNaN(value) ? value : null

            let isNotNull = value !== null

            if(value || isNotNull) Reflect.set(...arguments)

            if(!value && !isNotNull) {
                delete target[key]
                router.searchParams.delete(key)
            } 
            if(value || isNotNull) {
                router.searchParams.set(key, value)
            }
            api.pushState({}, '', router)

            onChange.call(this, 'query', api, key)
            return true;
        }
    })
    let api =  reactive({
        setPage: (page: number = 1) => api.params.page = page,
        params,
        pushState,
        query,
        loading: false,
        class: computed( () => api.loading ? "loading" : "waiting" )
    })

    return api
}

export { fauxRouter }