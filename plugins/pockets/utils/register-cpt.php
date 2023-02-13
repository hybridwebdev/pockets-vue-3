<?php
namespace pockets\utils;
class register_cpt { 
    function __construct($name, $plural_name, $params=[], $labels = []) {
        $labels = array_merge([ 
            'name' => _x( "{$plural_name}", "{$plural_name}"),
            'singular_name' => _x( $name, $name ),
            'add_new' => _x( 'Add New', $name  ),
            'add_new_item' => _x( "Add New {$name}", $name  ),
            'edit_item' => _x( "Edit {$name}", $name  ),
            'new_item' => _x( "New {$name}", $name ),
            'view_item' => _x( "View {$name}", $name ),
            'search_items' => _x( "Search {$plural_name}", $plural_name  ),
            'not_found' => _x( "No {$plural_name} found", $plural_name ),
            'not_found_in_trash' => _x( "No {$plural_name} found in Trash", $plural_name ),
            'parent_item_colon' => _x( "Parent {$name}:", $name  ),
            'menu_name' => _x( "{$plural_name}" , "{$plural_name}" ),
        ], $labels );
        $args = [
                'labels' => $labels,
                'description' =>  "{$name} description",
                'hierarchical' => true,
                'supports' => ['title', 'editor', 'excerpt', 'author', 'thumbnail', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'page-attributes'],
                'taxonomies' => ['category', 'post_tag', 'page-category'],
                'public' => true,
                'show_ui' => true,
                'show_in_menu' => true,
                'menu_position' => 5,
                'yarpp_support' => true,
                'show_in_nav_menus' => true,
                'publicly_queryable' => true,
                'exclude_from_search' => false,
                'has_archive' => true,
                'query_var' => true,
                'can_export' => true,
                'rewrite' => true,
                'capability_type' => 'post'
        ];
        register_post_type( str_replace([' '], ['_'], strtolower($name)), array_merge($args, $params));
    }
}