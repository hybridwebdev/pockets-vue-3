<?php
namespace pockets_node_tree\nodes;
class node {

    public $edit_fields = [];

    public $schema = [
        "fields" => ['class'],
        "title" => "Generic Container",
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
        return (new static)->_init();
    }

    final function _init (){
        \pockets\node_tree::$nodes['list'][] = $this->schema;
        array_map('\pockets\node_tree::register_field', $this->edit_fields);
        \pockets\node_tree::$nodeParsers[ $this->schema['node']['schema'] ] = $this;
    }
    
    
    public function initialize($node){
        return $this->hydrate(
            array_merge(
                $this->schema['node'], [ 'hash' => uniqid() ] 
            )
        );
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