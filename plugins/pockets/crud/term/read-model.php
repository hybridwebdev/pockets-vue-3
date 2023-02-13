<?php 
namespace pockets\crud\term;

class read_model extends \pockets\crud\resource {
    use \pockets\crud\render;
    function slug($iterator){
        return $this->resource->slug;
    }
    function term_group($iterator){
        return $this->resource->term_group;
    }
    function term_taxonomy_id($iterator){
        return $this->resource->term_taxonomy_id;
    }
    function taxonomy($iterator){
        return $this->resource->taxonomy;
    }
    function parent($iterator){
        return $this->resource->parent;
    }
    function count($iterator){
        return $this->resource->count;
    }
    function filter($iterator){
        return $this->resource->filter;
    }
    function name($iterator){
        return $this->resource->name;
    }
    function description($iterator){
        return $this->resource->description;
    }
    function ID($iterator){
        return $this->resource->term_id;
    }
    function link($iterator){
        return get_term_link($this->resource->term_id);
    }
    function children($iterator){
        $IDS = get_term_children($this->resource->term_id, $this->resource->taxonomy);
        
        if(is_wp_error( $IDS ) ) return [];

        return array_map(function($ID) use($iterator) {
            return \pockets\crud\term\model::init(["ID" => $ID])->read($iterator->value);
        }, (array) $IDS);

    }
    function acf($iterator){
        if(!is_array($iterator->value)) return;
        return $iterator::applyIterator($iterator->value, function($iterator) {
            return get_field($iterator->key, $this->resource);
        });
    }
}