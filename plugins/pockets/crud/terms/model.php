<?php 
namespace pockets\crud\terms;
class readModel extends \pockets\crud\resource {
    
    function items($iterator){
        return array_map(function($term) use($iterator) {
            return \pockets\crud\term\model::init($term)->read($iterator->value);
        }, $this->resource);
    }

}

class model extends \pockets\crud\model {
    /**
        This module is read only as it acts as a bridge
        to the term crud.
    */    
    public static $model_name = 'terms';

    private $resource;

    function read($fields) {
        if( !$this->resource ) return $this->error("Denied");
        return readModel::init( $this->resource )->walk($fields);
    }

    function request($resource = null){
        /**
        * right now this only accepts an array of terms.
        */

        $this->resource = $resource;

        if( !is_array($this->resource) ) {
            $this->resource = false;
        }

    }
}