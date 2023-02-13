<?php
namespace pockets\crud;
trait render {

    final function read($fields){
        return $this->walk($fields);
    }

    function render( $iterator ){
        $data = is_array($iterator) ? $iterator : $iterator->value;
        $string = '';
        $template = \pockets::locate_template($data);
        if($template) {
            ob_start();
                require($template);
            $string = ob_get_clean();
        }
        return $string;
    }
}