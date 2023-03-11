<?php
namespace pockets_node_tree\nodes\render_html;
class node extends \pockets_node_tree\nodes\node {

    public $edit_fields = [
        [
            'ID' => "content",
            'content'=> ['template' => 'fields/render-html/edit'],
            'group' => "Edit"
        ],
    ];

    public $schema = [
        "fields" => ['base-attributes', 'content', 'schema-selector'],
        "title" => "Render Html",
        "node" => [
            'el' => "render-html",
            'props' => [
                "class" => "col-12",
                "innerHTML" => "I am default content. You should change me!",
            ],
            "schema" => "render-html"
        ]
    ];

    function render($node){

        return [
            'open' => $this->apply_props("<div class='{{{class}}}'>{{{innerHTML}}}</div>", $node['props']),
        ];

    }
    
}