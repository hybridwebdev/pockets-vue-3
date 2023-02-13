<?php 
namespace pockets\crud\term;

class get_resource extends \pockets\crud\get_resource {
    function ID($query) {
        $ID = $query['ID'] ?? false;
        if(!$ID || !is_numeric($ID) ) return;
        return get_term($ID);
    }
    function slug($query) {
            
        $query = wp_parse_args($query, [
            'slug' => null,
            'taxonomy' => null
        ]);

        return get_term_by( 'slug', $query['slug'], $query['taxonomy']);

    }
}