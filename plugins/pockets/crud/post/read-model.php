<?php
namespace pockets\crud\post;
class read_model extends \pockets\crud\resource {
    use \pockets\crud\render;
    function image($iterator){
        $image_id = $post_thumbnail_id = get_post_thumbnail_id( $this->resource ) ?? false;
        return \pockets\crud\image\model::init( [ 'ID' => $image_id ] )->read($iterator->value);
    }

    function terms($iterator) {
        $terms = get_the_terms($this->resource->ID, $iterator->value['taxonomy'] );
        return \pockets\crud\terms\model::init( $terms )->read( $iterator->value );
    }

    function page_template($iterator){
        return get_post_meta( $this->resource->ID, '_wp_page_template', true );
    }

    function modified_date($iterator){
        $args = wp_parse_args( $iterator->value ?? [], [ 'format'=> 'd/j/y' ] );
        return get_the_modified_date($args['format'], $this->resource);
    }

    function date($iterator) {
        $args = wp_parse_args( $iterator->value ?? [], [ 'format'=> 'd/j/y' ] );
        return get_the_date($args['format'], $this->resource);
    }

    function edit_link($iterator) {
        return get_edit_post_link( $this->resource, '&');
    }

    function slug($iterator){
        return $this->resource->post_name;
    }

    function type($iterator){
        return $this->resource->post_type;
    }

    function ID($iterator){
        return $this->resource->ID;
    }

    function title($iterator){
        return $this->resource->post_title;
    }

    function link($iterator){
        $link = get_the_permalink( $this->resource->ID );
        if( $iterator->value['relative'] ?? false === true) {
            return wp_make_link_relative( $link );
        }
        return $link;
    }

    function content($iterator) {
        return apply_filters( 'the_content', $this->resource->post_content );
    }

    function excerpt($iterator){
        return apply_filters( 'the_excerpt', get_the_excerpt( $this->resource) );
    }

    function acf($iterator){
        if(!is_array($iterator->value)) return;
        return $iterator::applyIterator($iterator->value, function($iterator) {
            return get_field($iterator->key, $this->resource);
        });
    }
    
    function meta($iterator){
        if(!is_array($iterator->value)) return;
        return $iterator::applyIterator($iterator->value, function($iterator) {
            return get_post_meta($this->resource->ID, $iterator->key, true);
        });
    }

    function queried_object(){
        return [
            'ID' => $this->resource->ID,
            'type' => 'post'
        ];
    }
}