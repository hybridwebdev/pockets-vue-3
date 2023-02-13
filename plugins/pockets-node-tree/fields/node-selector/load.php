<?php
namespace pockets_node_tree\fields\node_selector; 
class load extends \pockets_node_tree\fields\field {
    public $schema =  [
        'ID'=> "node-selector",
        'content'=> ['template' => 'fields/attributes/node-selector'],
        'group'=> "Attributes"
    ];
}

