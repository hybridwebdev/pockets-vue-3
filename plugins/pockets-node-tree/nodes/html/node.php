<?php 
namespace pockets_node_tree\nodes\html;

class node extends \pockets_node_tree\nodes\node {

    public $schema = [
        "fields" => ['base-attributes', 'schema-selector', 'el-selector'],
        "title" => "HTML",
        
        "elTypes" => ["div", 'section', 'aside', 'header', 'footer'],

        "node" => [
            "el" => "div",
            "props" => [
                "class" => "col-12",
                'innerHTML' => "<p>Hello World</p>"
            ],
            "schema" => "html"
        ]
    ];

    function render($node){
        
        return [
            'open' => $this->apply_props("<div class='{{{class}}}'>", $node['props']),
            'close' => "</div>"
        ];

    }

}
