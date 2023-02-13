<?php
namespace pockets\utils;
class register_taxonomy {

    function __construct ($taxonomy, $post_type, $tax_slug = null , $tax_title=null, $args = []) {
        
        $tax_title =  ($tax_title) ? $tax_title : ucwords((str_replace("_", " ", $taxonomy)));
        $tax_slug =  ($tax_slug) ? $tax_slug : $taxonomy;
        $stripped_tax = ucwords((str_replace("_", " ", $taxonomy))); 

        register_taxonomy($taxonomy, $post_type, array_merge($args, [
            'hierarchical' => true,
            'labels' => [
                'name' => _x( $tax_title, 'taxonomy general name' ),
                'singular_name' => _x( 'Category', 'taxonomy singular name' ),
                'search_items'      =>__("Search {$stripped_tax} Types"),
                'popular_items'     =>__("Popular {$stripped_tax} Types"),
                'all_items'         =>__("All {$stripped_tax} Types"),
                'parent_item'       =>__( "Parent {$stripped_tax} Types" ),
                'parent_item_colon' =>__( "Parent {$stripped_tax} Type:" ),
                'edit_item'         =>__( "Edit {$stripped_tax} Type" ),
                'update_item'       =>__( "Update {$stripped_tax} Type" ),
                'add_new_item'      =>__( "Add New {$stripped_tax} Type" ),
                'new_item_name'     =>__( "New {$stripped_tax} Type Name" )
                        
            ],
            'show_ui'=>true,
            'show_in_nav_menus'=>true,
            'rewrite' => [ 'slug' => $tax_slug  ],
            'public'                     => true,
            'show_admin_column'          => true,
            'show_in_nav_menus'          => true,
            'show_tagcloud'              => true
        ]));
                    
    }             

}
