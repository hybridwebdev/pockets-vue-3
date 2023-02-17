import { InjectionKey } from "vue"
import type { createdApi } from './types'
export let injectionKey: InjectionKey<createdApi> = Symbol('pockets-node-tree-api')