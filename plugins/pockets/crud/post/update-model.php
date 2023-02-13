<?php
namespace pockets\crud\post;
class update_model extends \pockets\crud\resource {

    function image($iterator){
        
        $ID = $iterator->value ?? null;
        
        if( !is_numeric($ID) || $ID === 0 ){
            delete_post_meta( $this->resource->ID, '_thumbnail_id' );
            return;
        }

        if( is_numeric($ID) && get_post($ID) && wp_get_attachment_image( $ID, 'thumbnail' ) ) {
            update_post_meta( $this->resource->ID, '_thumbnail_id', $ID );
            return;
        }

    }

    function content($iterator){
        $this->resource->post_content = wp_kses_post($iterator->value);
    }
    function status($iterator){
        $this->resource->post_status = wp_kses_post($iterator->value);
    }
    function title($iterator){
        $this->resource->post_title = wp_kses_post($iterator->value);
    }
    function type($iterator){
        $this->resource->post_type = $iterator->value;
    }
    function acf($iterator){
        $iterator::applyIterator($iterator->value, function($iterator) {
            update_field($iterator->key, $iterator->value, $this->resource);
        });
    }
    function meta($iterator){
        if(!is_array($iterator->value)) return;
        return $iterator::applyIterator($iterator->value, function($iterator) {
            return update_post_meta($this->resource->ID, $iterator->key, $iterator->value);
        });
    }

    function terms($iterator){
        /**
        *   reference https://developer.wordpress.org/reference/functions/wp_set_post_terms/
            Because of the hierachal nature of terms, it's mandatory that the IDS argument be an array of numeric IDS,
            So that children with the same names but different parents aren't confused.

            The keyed Value of this will become the taxonomy name.

            Eg 'category' => ['IDS' => [1]] category would be the taxonomy.
        */
        if(!is_array($iterator->value)) return;
        
        return $iterator::applyIterator($iterator->value, function($iterator) {
            
            $taxonomy = $iterator->key;
            
            if( !taxonomy_exists($taxonomy) ) return;

            list(
                'IDS' => $IDS,
                'append' => $append,
            ) = wp_parse_args( $iterator->value ?? [], [
                'IDS' => null,
                'append' => false
            ] );

            if( !is_array($IDS) ) return; 

            wp_set_post_terms( $this->resource->ID, $IDS, $taxonomy, $append);

        });

    }
}