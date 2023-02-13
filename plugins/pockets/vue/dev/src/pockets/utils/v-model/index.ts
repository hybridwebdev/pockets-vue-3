import { computed } from 'vue'
export function vModel(props, emit, name = 'modelValue') { 
    return computed({ 
        get: () => props[name], 
        set: (value) => emit(`update:${name}`, value) 
    })
}
 