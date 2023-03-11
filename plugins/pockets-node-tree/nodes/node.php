<?php
namespace pockets_node_tree\nodes;
trait wrapper_functions {
     
    /** 
        These act as middleware between the nodes methods and the walker that invokes them.
        They should be used as the entry point for the walkers.
    */

    final function __save($node){
        return $this->save($node);
    }

    final function __hydrate($node){
        $node = $this->hydrate($node);
        return $node;
    }

    final function __initialize($node) {
        return $this->initialize( 
            $this->__hydrate( $this->schema['node']  ) 
        );
    }

}
class node {
    use wrapper_functions;
    public $edit_fields = [];

    public $schema = [
        "fields" => ['class'],
        "title" => "Generic Container",
        "el-types" => [],
        "node" => [
            'el' => "div",
            'props' => [
                "class" => "col-12",
            ],
            "schema" => "node-container"
        ],
        'nodes' => [],
        'data' => []
    ];

    final static function init(){
        return (new static)->__init();
    }

    final function __init (){
        \pockets\node_tree::$nodes['list'][] = $this->schema;
        array_map('\pockets\node_tree::register_field', $this->edit_fields);
        \pockets\node_tree::$nodeParsers[ $this->schema['node']['schema'] ] = $this;
    }
    
    function save($node){
        return $node;
    }
    
    function initialize($node){
        return $node;
    }

    function hydrate($node){
        return $node;
    }

    function render($node){
        return [
            'open' => '<div>',
            'innerHTML' => "HELLO WORLD",
            'close' => '</div>',
        ];
    }
    
    function apply_props(string $string, array $props){
      
        $convert = array_reduce( array_keys($props), function(array $acc, string $e) use($props) {
            $acc["{{{{$e}}}}"] = $props[$e];
            return $acc;
        }, []);

        return str_replace( array_keys($convert), array_values($convert), $string );

    }

}