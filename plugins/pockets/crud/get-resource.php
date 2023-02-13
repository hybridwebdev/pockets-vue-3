<?php
namespace pockets\crud;
class get_resource {
    /**
        A query should be an array with at least a by key. 
        Ex: ['by' => "example"];
        In this example the constructor would look to see if the extending
        class has a method called example and call it, passing in the untouched query array.
        That method can return anything, but should be used to return a resource using the query it got.
    */
    public $resource;
    function __construct($query){
        list(
            'by' => $by, 
        ) = $query;
        $fn = [$this, $by];
        if( is_callable($fn) ) $this->resource = call_user_func($fn, $query);
    }
    static function init($query){
        $instance = (new static($query));
        return $instance->resource;
    }
}