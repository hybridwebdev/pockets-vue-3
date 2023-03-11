<?php 
namespace pockets_node_tree\nodes\container;

class node extends \pockets_node_tree\nodes\node {

    public $schema = [
        "fields" => ['base-attributes', 'schema-selector', 'el-selector'],
        "title" => "Container",
        
        "elTypes" => ["div", 'section', 'aside', 'header', 'footer'],

        "node" => [
            "el" => "div",
            "props" => [
                    "class" => "col-12"
            ],
            "nodes" => [],
            "schema" => "node-container"
        ]
    ];

    function render($node){
        
        return [
            'open' => $this->apply_props("<div class='{{{class}}}'>", $node['props']),
            'close' => "</div>"
        ];

    }

}
