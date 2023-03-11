<?php 
namespace pockets_node_tree\nodes\youtube;
class node extends \pockets_node_tree\nodes\node {
    public $edit_fields = [
        [
            'ID'=> "youtube",
             'content'=> ['template' => 'fields/youtube/edit'],
            'group'=> "Edit"
        ]
    ];
    public $schema = [
        "fields" => ['base-attributes', 'youtube', 'schema-selector'],
        "title" => "Youtube",
        "node" => [
            "schema" => "youtube",
            "el" => "youtube",
            "props" => [
                "videoid" => 'oOlft8xFdlY',
                "class" => "col-12"
            ],
        ]
    ];

    public function render($node) {

        list(
            'class' => $class,
            'videoid' => $videoid
        ) = $node['props'];

        return [
            'open' => "<youtube class='$class' videoid='$videoid'>",
            'close' => "</youtube>"
        ];

    }

}