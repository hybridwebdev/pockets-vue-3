// @ts-nocheck
export let debounce = (fnc: Function, delay: number = 500) => {
    let timeout = null;
    return function () {
        clearTimeout(timeout as any);
        timeout = setTimeout(fnc, delay);
    };
}

export let debounceDirective = function debounce(el, binding) {
    if(binding.value == binding.oldValue) return
    el.oninput = debounce(function(){
        el.dispatchEvent(new Event('change'))
    }, parseInt(binding.value) || 500)
}