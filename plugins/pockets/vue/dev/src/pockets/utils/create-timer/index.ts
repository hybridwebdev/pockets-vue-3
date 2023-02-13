export let createTimer = ( cb: () => void, interval: number ) => {
    
    let timer:any = null

    return {
        start() {
            if(interval <=0) return;
            if(timer) clearInterval(timer)
            timer = setInterval(cb, interval)
        },
        stop(){
            clearInterval(timer)
        } 
    }
} 