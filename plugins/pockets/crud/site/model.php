<?php 
namespace pockets\crud\site;

class model extends \pockets\crud\model {
    
    public static $model_name = 'site';

    public $read_model_class = '\pockets\crud\site\read_model';

    function read($fields){
        return $this->read_model_class::init( [] )->walk($fields);
    }
    
}