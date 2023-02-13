<?php
namespace pockets\crud\wp_object;

class get_resource extends \pockets\crud\get_resource {
    
    function array( $request ) {
        
        list(
            'resource' => $resource
        ) = $request;

        $map = [
            'post' => [$this, 'get_post'],
        ];

        list(
            'type' => $type,
            'ID' => $ID
        ) = wp_parse_args( $resource, [
            'type' => false,
            'ID' => false
        ] );
        
        if(!$type || !$ID) return;

        $cb = $map[$type] ?? false;

        if(!$cb) return;
        
        return $cb(['ID' => $ID]);

    }

    function object( $request ){
        
        list(
            'resource' => $resource
        ) = $request;

        $class = strtolower( get_class($resource) );

        $map = [
            'wp_post' => [$this, 'get_post'],
        ];

        $cb = $map[$class] ?? false;

        if(!$cb) return;

        return $cb($resource);
    }

    function get_post($init){
        return \pockets::crud('post')::init($init);
    }

}
