<?php
namespace pockets_node_tree\nodes\render_html;
class node extends \pockets_node_tree\nodes\node {

    public $edit_fields = [
        [
            'ID' => "content",
            'content' => "<textarea v-model='node.props.innerHTML' class='form-control'></textarea>",
            'group' => "Edit"
        ],
    ];

    public $schema = [
        "fields" => ['class', 'content', 'node-selector'],
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