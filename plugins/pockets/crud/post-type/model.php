<?php 
namespace pockets\crud\post_type;
class readModel extends \pockets\crud\resource {
    use \pockets\crud\render;
    function name($iterator) {
        return $this->resource->name;
    }
     function acf($iterator){
        if(!is_array($iterator->value)) return;
        return $iterator::applyIterator($iterator->value, function($iterator) {
            return get_field($iterator->key, "{$this->resource->name}_options");
        });
    }
    function link($iterator){
        
        $link = get_post_type_archive_link($this->resource->name);
        if( $iterator->value['relative'] ?? false === true) {
            return wp_make_link_relative( $link );
        }
        return $link;
    }
    
    function slug($iterator){
        return $this->resource->rewrite['slug'];
    }
}

class model extends \pockets\crud\model {
    /**
        This module is read only as it acts as a bridge
        to the post crud.
    */    
    public static $model_name = 'post-type';

    public $resource;

    function read($fields) {
        if(!$this->resource instanceof \WP_Post_Type) return $this->error('Denied');
        return readModel::init( $this->resource )->walk($fields);
    }

    function request($resource = null){
        
        $this->resource = $resource;
        
        if($this->resource instanceof \WP_Post_Type) return;

    }
}