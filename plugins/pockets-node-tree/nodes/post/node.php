<?php 
namespace pockets_node_tree\nodes\post;

class node extends \pockets_node_tree\nodes\node {

    public $edit_fields = [
        [
            'ID'=> "post-settings",
            'content'=> ['template' => 'fields/post/field'],
            'group'=> "Edit" 
        ]
    ];

    public $schema = [
        "fields" => ['base-attributes', 'post-settings', 'schema-selector', 'el-selector'],
        "elTypes" => ['div', 'article'],
        "title" => "Post",
        "node" => [
            "el" => "div",
            "props" => [
                'class' => 'col-12',
            ],
            'data' => [
                'source' => 'queried_object',
                'ID' => false,
                'field' => 'title'
            ],
            "schema" => "post",
        ]
    ];

    function hydrate($node){
        
        list(
            'source' => $source,
            'ID' => $ID,
            'field' => $field
        ) = $node['data'];

        $read = ["{$field}:innerHTML"];

        $result = \pockets::crud('post')::init(\pockets\queried_object::get())->read($read);

        $node['props']['innerHTML'] = $result['innerHTML'];

        return $node;
    }
    function render($node){
        
        return [
            'open' => $this->apply_props("<div class='{{{class}}}'>{{{innerHTML}}}", $node['props']),
            'close' => "</div>"
        ];

    }

}
