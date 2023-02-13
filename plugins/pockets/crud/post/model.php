<?php
namespace pockets\crud\post;

class model extends \pockets\crud\model {

    public static $model_name = 'post';
    
    public $read_model_class = '\pockets\crud\post\read_model';
    public $resource_model_class = '\pockets\crud\post\get_resource';

    function read_model($fields){
        return $this->read_model_class::init( $this->resource )->walk($fields);
    }
    function update_model($fields){
        return update_model::init( $this->resource )->walk($fields);
    }

    function update($fields){
        if( !current_user_can('edit_post', $this->resource ) ) return $this->error('Denied');
        $this->update_model($fields);
        $updated = wp_update_post( $this->resource );
        return is_wp_error($updated) ? $updated : ['ID' => $this->resource->ID];
    }
    function read($fields){
        
        if(!$this->resource) return $this->error('Denied');
        
        //if( !current_user_can('read_post', $this->resource ) ) return $this->error('Denied');
        return $this->read_model($fields);
    }

    function delete($fields = null) {
        if( !current_user_can('edit_post', $this->resource ) ) return $this->error('Denied');
        $deleted = wp_delete_post($this->resource->ID);
        return is_wp_error($deleted) ? $deleted : ['ID' => $this->resource->ID];
    }
    /**
        Create makes a new post. It does not check if one already exists, so any logic requiring that
        should be before using it.

        returns [ "ID" => post id created ] | error message
    */

    function create($fields) {
        if( !current_user_can('edit_posts') ) $this->error('Denied');
        /**
            Create An Empty post object
        */
        $this->resource = new \WP_Post( (object)[''] );
        /**
            applying update model to dummy post 
        */
        $this->update_model($fields);
        /**
            getting title and type from dummy object to use to create new post as these 2 are the bare minimum reqiured.
        */
        $created = $this->read_model(['title:post_title', 'type:post_type'] );
        /**
            Creating real post
        */
        $ID = wp_insert_post($created);
        /**
            using newly created posts ID and then running update model;
        */
        $this->resource->ID = $ID; 
        $this->update($fields);
      
        return $this->read(['ID']);
    }

    function request($resource = null) {
        
        if( !$resource ) return;

        if( $resource instanceof \Wp_Post ) {
            $this->resource = $resource;
            return;
        }

        if( !is_array($resource) ) {
            return;
        }

        $args = wp_parse_args($resource, [
            'by' => "ID"
        ] );

        $this->resource = $this->resource_model_class::init($args);
        
    }

}
