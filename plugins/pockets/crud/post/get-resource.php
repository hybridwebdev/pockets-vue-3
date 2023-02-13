<?php
namespace pockets\crud\post;

class get_resource extends \pockets\crud\get_resource {
    function ID($query) {
        $ID = $query['ID'] ?? false;
        if(!$ID || !is_numeric($ID) ) return;
        return get_post($ID);
    }
}
