<?php
namespace pockets\crud\post;
use pockets\crud\post\model as post;

class model_test extends \pockets\crud\model_test {

    function __construct(){

        $resource = [ "ID" => 1557];

        $updated = post::init($resource)->update( [
            'title' => "A new Wheelaaaaaa!",
            'image' => 1467,
            'terms' => [
                'brands' => [ "IDS" => [82, 83] ]
            ],
            'acf' => [
                'video' => [
                    'url' => "a url"
                ],
            ],
            'meta' => [
                'a_test' => "A test"
            ],
        ] );

        $read = post::init( $resource )->read( [
            'title',
            'image' => [
                'url'
            ],
            
            'content',
            "date" => ['format' => "d/m/Y"],
            "edit_link",
            "slug",
            "ID",
            'type',
            'link',
            'acf' => [
                'video'
            ],
            'meta' => [
                'a_test'
            ],
            'terms' => [
                'taxonomy' => 'brands',
                'items:<=' => [
                    'slug',
                    'term_group',
                    'term_taxonomy_id',
                    'taxonomy',
                    'count',
                    'parent',
                    'filter',
                    'ID',
                    'name',
                    'description'
                ]
            ],
            
        ] );

        //$deleted = post::init( $resource )->delete();

        $this->log("Created", $resource ?? "");
        $this->log('Updated', $updated ?? "Not Run");
        $this->log('Read', $read ?? 'Not Run');
        $this->log('Deleted', $deleted ?? "Not Run");
    }
}