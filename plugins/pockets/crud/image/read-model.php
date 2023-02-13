<?php 
namespace pockets\crud\image;
class read_model extends \pockets\crud\resource {
    function ID($iterator){
        return $this->resource->ID;
    }
    function url($iterator){

        list(
            'size' => $size,
            'fallback' => $fallback_size,
        ) = wp_parse_args( $iterator->value, [
            'size' => 'thumbnail',
            'fallback' => false
        ] );

        $url = wp_get_attachment_image_url( $this->resource->ID , $size );
        if($fallback_size) {
            return \pockets::image_fallback($url ?? false, $fallback_size);
        }
        return $url;
    }
    
    function dimensions($iterator){
        
        list(
            'size' => $size,
            'fallback' => $fallback_size,
        ) = wp_parse_args( $iterator->value, [
            'size' => 'thumbnail',
            'fallback' => "300x300"
        ] );
        

        $image = wp_get_attachment_image_src( $this->resource->ID , $size);
        
        if(!$image) {
            $fallback_size = explode('x', $fallback_size);
            return [
                'width' => $fallback_size[0],
                'height' => $fallback_size[1]
            ];
        }
        return [
            'width'=> $image[1],
            'height' => $image[2]
        ];
    }
}
