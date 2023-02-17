import { InjectionKey, inject } from "vue"
import type { createdApi } from '@/node-tree/types'

export let injectionKey: InjectionKey<createdApi> = Symbol('pockets-node-tree-api')

export let useInject = () => {
  const resolved = inject(injectionKey);
  if (!resolved) {
    throw new Error(`Could not resolve Injection`);
  }
  return resolved;
}