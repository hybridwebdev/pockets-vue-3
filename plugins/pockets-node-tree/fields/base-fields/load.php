<?php
namespace pockets_node_tree\fields\base_fields; 
class load extends \pockets_node_tree\fields\field {
    public $schemas = [
        [
            'ID'=> "base-attributes",
            'content'=> ['template' => 'fields/attributes/base'],
            'group'=> "Attributes"
        ],
        [
            'ID'=> "node-selector",
            'content'=> ['template' => 'fields/attributes/node-selector'],
            'group'=> "Schema"
        ],
    ];
}

