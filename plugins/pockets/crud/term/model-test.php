<?php
namespace pockets\crud\term;
use pockets\crud\term\model as term;
class model_test extends \pockets\crud\model_test {

    function __construct(){
        $term_by = [ 'by' => 'slug', 'slug' => 'slug-1', 'taxonomy' => 'brands' ];

        $created = term::init()->create( [
            'name' => "A name",
            'slug' => "slug-1",
            'taxonomy' => 'brands'
        ] );
        
        $updated = term::init( $term_by )
            ->update( [
                'description' => "a new description",
            ] );

        $read = term::init( $term_by )
            ->read( [
                'description',
                'taxonomy',
                'ID', 
                'title', 
                'slug'
            ] );


        
        $deleted = term::init($term_by)->delete();

        $this->log("Created Term", $created ?? "");
        $this->log("Read Term",    $read    ?? "");
        $this->log("Updated Term", $updated ?? "");
        $this->log("Deleted Term", $deleted ?? "");
    }
}