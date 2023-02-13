<?php
namespace pockets_node_tree\fields;
class field {

    public $schema =[
        'ID' => "generic-edit-field", // should be unique
        'content' => "<textarea v-model='node.props.innerHTML' class='form-control'></textarea>",
        'group' => "Field Group Title"
    ];
    /*
        $schemas should be null or an array of $schema
    */
    public $schemas = null; 

    static function init(){
        return (new static)->_init();
    }

    final function _init (){
        if($this->schema) {
            \pockets\node_tree::register_field($this->schema);
        }
        if(is_array($this->schemas ?? false)) {
            array_map('\pockets\node_tree::register_field', $this->schemas);
        }
    }
    
}