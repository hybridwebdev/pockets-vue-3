<?php 
namespace pockets\crud\term;

class update_model extends \pockets\crud\resource {

    function description($iterator){
        return $this->resource->description = $iterator->value;
    }
    function parent($iterator){
        return $this->resource->parent = $iterator->value;
    }
    function slug($iterator){
        return $this->resource->slug = $iterator->value;
    }
    function name($iterator){
        return $this->resource->name  = $iterator->value;
    }
    function taxonomy($iterator){
        return $this->resource->taxonomy  = $iterator->value;
    }
}