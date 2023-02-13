<?php
namespace pockets\crud\wp_object;
class model extends \pockets\crud\model {
    
    public static $model_name = 'wp-object';

    public $resource_model_class = '\pockets\crud\wp_object\get_resource';

    function update($fields){
        if($this->resource) {
            return $this->resource->update($fields);
        }
    }

    function read($fields){
        if($this->resource) {
            return $this->resource->read($fields);
        }
    }

    function request($resource = null) {

        $this->resource = $this->resource_model_class::init([
            'by' => gettype($resource), 
            'resource' => $resource
        ]); 

    }
}