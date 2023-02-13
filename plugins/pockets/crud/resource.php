<?php 
namespace pockets\crud;
class resource {
    
    /**
        A crud resource is a reference to data, such as a post object. 
        It can be any piece of data that the models will interact with.
    */

    /**
        Any methods not in reserved will be mapped to fields.
        This can be used to exclude methods you do not want 
        publicly availab.e
    */

    public $reserved = ['create', '__construct', 'applyIterator'];

    final function __construct($object){

        $methods = get_class_methods($this);
        $methods = array_filter($methods, function($method){
            return !in_array($method, $this->reserved);
        });       

        $this->resource = $object;
        $this->fields = array_reduce($methods, function($acc, $k) {
            $acc[$k] = [$this, $k];
            return $acc;
        }, []);
    }

    final function applyIterator(array $query, array | callable $model){
        return reducer::applyIterator($query, $model );
    }
    static function init(...$args){
        return new static(...$args);
    }
    function walk($fields){
        return $this->applyIterator($fields, $this->fields);
    }
}