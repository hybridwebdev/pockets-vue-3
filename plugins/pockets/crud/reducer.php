<?php 
namespace pockets\crud;

class reducer {
    private array $array; // passed in array that is iterated
    public string | int $key; // Current key iterator is on
    public mixed $value; // Current value iterator is on
    final function __construct($array, $model){
        $this->array = $array;
        $this->model = $model;
    }
    private function alias_key(String $key = ''){
        $arr = explode(":", $key);
        return $key == '' 
            ? false
            : [
                    'key'=> $arr[0],
                    'alias'=> isset( $arr[1] ) ? $arr[1] : $arr[0]
            ];  
    }
    private function reducer($acc, $index) {
        /**
        * Figuring out how to interpret the map.  
        */
        $invert = is_numeric($index);
        $map_key = $invert ? $this->array[$index] : $index;
        $map_value = $invert ? null : $this->array[$map_key];
        list( 
            'key' => $key, 
            'alias' => $alias
        ) = $this->alias_key($map_key);
        $this->key = $key;
        $this->value = $map_value;
        if( $this->validator() === false ) return $acc;
        $this->filtered_value = $this->middleware();
        /**
        * This is handling returning the value. 
        * In the case of the alias being a <= the value is pushed back down a level in the array.
        */                
        if($alias == "<=") {
            return array_merge($acc, $this->filtered_value);
        }
        $acc[ $alias ] = $this->filtered_value;
        return $acc;
    }
    /**
        Middleware is a function that intercepts each iteration, applying a callback
        that recieves the current iterator
    */
    final public function iterate(){
        return array_reduce( array_keys($this->array), [$this, 'reducer'], [] );
    }
    final static function applyIterator(array $array, array | callable $model){
        if( is_array($model) ) {
            $iterator = new arrayMiddleware( $array, $model );
        }
        if( is_callable($model) ) {
            $iterator = new functionMiddleware( $array, $model );
        }
        if($iterator) return $iterator->iterate();
    }     
    /**
        Validator is a function that intercepts each iteration, applying a callback
        that recieves the current iterator. If the function returns false the 
        current iteration will be skipped.
    */
    function validator(){}
    /**
        Middleware is a function that intercepts each iteration, applying a callback
        that recieves the current iterator. 
    */
    function middleware(){}
}

class functionMiddleware extends reducer {
    function middleware() {
        if( is_callable($this->model) ) {
            return call_user_func($this->model, $this);
        }
    }

    public function validator(){
        /*
            Because this is handled via a callback, the callback is responsible for validating itself;
        */
        return true;
    }
}

class arrayMiddleware extends reducer {
    function middleware() {
        $fn = $this->model[$this->key] ?? false;
        if(!$fn || !is_callable($fn) ) return;
        return call_user_func($fn, $this);
    }
    /**
        Validator is a function that intercepts each iteration, applying a callback
        that recieves the current iterator. If the function returns false the 
        current iteration will be skipped.
    */
    public function validator(){
        return in_array($this->key, array_keys($this->model) );
    }
    
}
