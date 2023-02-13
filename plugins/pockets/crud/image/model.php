<?php 
namespace pockets\crud\image;

class model extends \pockets\crud\posts\model {
    
    public static $model_name = 'image';

    public $read_model_class = '\pockets\crud\image\read_model';

    function request($resource = null){
        if( $resource instanceof \WP_Post) {
            $this->resource = $resource;
            return;
        }
        if(
            $resource['ID'] && 
            is_numeric($resource['ID'])
        ) {
            $this->resource = get_post($resource['ID']);
        }

    }
}