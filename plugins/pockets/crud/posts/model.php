<?php 
namespace pockets\crud\posts;

class model extends \pockets\crud\model {
    /**
        This module is read only as it acts as a bridge
        to the post crud.
    */    
    public static $model_name = 'posts';

    public $read_model_class = '\pockets\crud\posts\read_model';

    public $resource;

    function read($fields) {
        if( !$this->resource ) return $this->error('Denied');
        return $this->read_model_class::init( $this->resource )->walk($fields);
    }

    function request($resource = null){
        
        if( !$resource ) return;

        $this->resource = $resource;
        
        /**
        * If a Wp_Query instance is passed in, use that.
        */
        
        if( $this->resource instanceof \Wp_Query ) return;

        /**
        * If an array is given, it should be in the structure Wp_Query accepts.  
        */
        if( is_array( $this->resource ) ) {
            $this->resource = new \Wp_Query( $this->resource );
            return;
        }

        /**
        * All operations should trap on the fact nothing valid was found. 
        */
        $this->resource = false;

    }
}