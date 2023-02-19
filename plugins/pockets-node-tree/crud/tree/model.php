<?php 
namespace pockets_node_tree\crud\tree;
  
class model extends \pockets\crud\model {
    
    /**
    * This model is for interacting with node trees. 
    * On update and read, it will find the relevant tree and then apply schema filters on each node
    */

    public static $model_name = 'node-tree/root';
    public $resource;

    public function read($fields){
        
        $key = $this->normalize_key();

        $root = \pockets::crud('wp-object')::init($this->resource)->read( [
            'meta:<=' => [ $key ]
        ] )[$key];

        if($root == '') {
            $root = \pockets\node_tree::get_default_node();
        }

        return [ 
            'root' => \pockets::crud('node-tree/node')::init($root)->read($fields), 
            'source' => $this->resource 
        ];

    }

    public function normalize_key() {
        $key = $this->resource['metaKey'] ?? "default";
        return "pockets-node-tree-temp{$key}";
    }

    public function update($node_tree) {

        return \pockets::crud('wp-object')::init($this->resource)->update( [
            'meta' => [ 
                $this->normalize_key() => \pockets::crud('node-tree/node')::init( $node_tree )->read( ['sanitize:<='] ) 
            ]
        ] );

    }

    function request($resource = null){
        /**
        * Request should be the following:
            [
                'ID' => number,
                'type' => type of wp object, get post, term etc,
                'metaKey => string key to use for save or load 
            ]
        */
        $this->resource = $resource;
    }   

}