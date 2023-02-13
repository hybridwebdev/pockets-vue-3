<?php
namespace pockets_node_tree\fields\base_fields; 
class load extends \pockets_node_tree\fields\field {
    public $schemas = [
        [
            'ID'=> "class",
            'content'=> ['template' => 'fields/attributes/class'],
            'group'=> "Attributes"
        ],
        [
            'ID'=> "node-selector",
            'content'=> ['template' => 'fields/attributes/node-selector'],
            'group'=> "Attributes"
        ],
    ];
}

