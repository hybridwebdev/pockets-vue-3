<?php
namespace pockets\crud;
class load {
    function __construct(){
        
        /**
            Register models globally
        */

        \pockets\crud\images\model::register();
        \pockets\crud\image\model::register();

        \pockets\crud\post\model::register();
        \pockets\crud\posts\model::register();
        \pockets\crud\post_type\model::register();
        
        \pockets\crud\term\model::register();
        \pockets\crud\terms\model::register();

        \pockets\crud\wp_object\model::register();
        \pockets\crud\site\model::register();

    }
}