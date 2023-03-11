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
            'ID'=> "schema-selector",
            'content'=> ['template' => 'fields/attributes/schema-selector'],
            'group'=> "Schema"
        ],
        [
            'ID'=> "el-selector",
            'content'=> ['template' => 'fields/attributes/el-selector'],
            'group'=> "Element"
        ],
    ];
}

