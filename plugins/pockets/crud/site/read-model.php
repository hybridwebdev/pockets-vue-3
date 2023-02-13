<?php 
namespace pockets\crud\site;
class read_model extends \pockets\crud\resource {
    function image_sizes($iterator) {
        return get_intermediate_image_sizes();
    }
}
