import { InjectionKey, inject } from "vue"
export let injectionKey: InjectionKey<any> = Symbol('tip-tap-editor')

export let injectEditor = () => {
  const resolved = inject(injectionKey);
  if (!resolved) {
    throw new Error(`Could not resolve Injection`);
  }
  return resolved;
}