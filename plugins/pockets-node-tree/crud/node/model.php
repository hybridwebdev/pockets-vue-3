<?php 
namespace pockets_node_tree\crud\node;
  
class model extends \pockets\crud\model {
    /**
        This model is read only
    */
    public static $model_name = 'node-tree/node';

    public function read($fields){
        return read_model::init( $this->node )->walk($fields);
    }
    
    function request($node = null){
        $this->node = $node;
    }   

}