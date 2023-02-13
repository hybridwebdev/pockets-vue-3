<?php 
namespace pockets\crud\term;

class model extends \pockets\crud\model {
    /**
        This module is read only as it acts as a bridge
        to the term crud.
    */    
    public static $model_name = 'term';

    private $resource;

    function delete($fields = null) {
        
        if( !current_user_can('manage_categories') ) return $this->error("Denied");

        if( !$this->resource ) return $this->error("Denied");

        if( !$this->resource instanceof \Wp_term ) return $this->error("Denied");

        list(
            'taxonomy' => $taxonomy,
            'term_id' => $ID,
        ) = $this->resource->to_array();
        
        $deleted = wp_delete_term( $ID, $taxonomy);
        
        return is_wp_error( $deleted ) ? $deleted : ['ID' => $ID ];

    }

    function read($fields) {
        if( !$this->resource ) return $this->error("Denied");
        return read_model::init( $this->resource )->walk($fields);
    }

    function create($fields) {
        
        if( !current_user_can('manage_categories') ) return $this->error("Denied");

        /**
            Creating an instance of Wp_Term with no data.
            Then applying write model to set data.
            Finally, running wp_insert_term which will return an error
            if a term with the slug name in the taxonomy provided already 
            exists. 

            The bare minimum required to create a term is
            
            name
            taxonomy
            slug

        */

        $term = new \WP_Term( new \stdclass );
        
        update_model::init( $term )->walk($fields);

        $term = $term->to_array();
        
        list(
            'name' => $name,
            'taxonomy' => $taxonomy,
            'slug'  => $slug
        ) = $term;
        
        $created = wp_insert_term( $name, $taxonomy, $term );

        return is_wp_error($created) ? $created : [ 'ID' => $created['term_id'] ];
 
    }

    function update($fields) {

        if( !current_user_can('manage_categories') ) return $this->error("Denied");

        if( !$this->resource instanceof \Wp_Term ) return $this->error("Denied");

        update_model::init( $this->resource )->walk($fields);
        
        $term = $this->resource->to_array();

        $updated = wp_update_term( $term['term_id'], $term['taxonomy'], $term );
        
        return is_wp_error($updated) ? $updated : [ 'ID' => $updated['term_id'] ];

    }

    function request($resource = null){

        $this->resource = $resource;
        
        if( $this->resource instanceof \Wp_Term) return;

        if( !is_array($this->resource) ) return;

        $args = wp_parse_args($this->resource, [
            'ID' => false,
            'by' => "ID"
        ] );

        $this->resource = get_resource::init($args);

    }
    static function model_test() {
        return new model_test;
    }
}
