

export let plugin = {
    
    init(app: any, $pockets: any){

        let { move } = $pockets.utils.array

        let arr = [
            0, 1, 2, 3, 4, 5
        ];
        console.log(move(arr, -30, -45), '1');
        console.log(move(arr, 0, -45), '2');
        console.log(move(arr, 0, 1), '3');
        console.log(move(arr, 1, 0), '4');
        console.log(move(arr, 0, 0), '5');
        console.log(move(arr, 5, 5), '6');
    },

}
 