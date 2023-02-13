<?php
namespace pockets_node_tree\nodes\image;

class node extends \pockets_node_tree\nodes\node {
    
    public $edit_fields = [
        [
            'ID'=> "image-settings",
            'content'=> ['template' => 'fields/image/image-settings-field'],
            'group'=> "Edit"
        ]
    ];
    
    public $schema = [
        "fields" => ['base-attributes', 'image-settings', 'node-selector'],
        "title" => "Image",
        "node" => [
            "el" => "img",
            "props" => [
                "src" => "https://via.placeholder.com/150",
                "class" => "col-12"
            ],
            "schema" => "image",
            "data" => [
                "source" => 'remote',
                "ID" => false,
                'size' => 'full'
            ]
        ],
    ];
    
    function hydrate($node){
        
        list(
            'ID' => $ID,
            'source' => $source
        ) = $node['data'];

        if($source == 'media' && $ID) {
            $node['props']['src'] = \pockets::crud('image')::init(['ID' => $ID])->read([
                'url' => [
                    'size' => $node['data']['size'] ?? 'full'
                ]
            ])['url'];
        }
        return $node;
    }
    
    function render($node){

        return [
            'open' => $this->apply_props("<img class='{{{class}}}' src='{{{src}}}'>", $node['props']),
        ];

    }

}