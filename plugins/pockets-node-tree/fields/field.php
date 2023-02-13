<?php
namespace pockets_node_tree\fields;
class field {

    public $schema =[
        'ID' => "generic-edit-field", // should be unique
        'content' => "<textarea v-model='node.props.innerHTML' class='form-control'></textarea>",
        'group' => "Field Group Title"
    ];

    static function init(){
        return (new static)->_init();
    }

    final function _init (){
        \pockets\node_tree::register_field($this->schema);
    }
    
}