<?php
namespace pockets_node_tree\nodes\wp_nav_menu;
class node extends \pockets_node_tree\nodes\node {

    public $schema = [
        "fields" => ['class', 'node-selector'],
        "title" => "Wp Nav",
        "node" => [
            "schema" => "wp-nav-menu",
            'el' => "menu",
            'props' => [
                "class" => "nav-tabs list-unstyled d-flex text-center text-white bg-primary-md m-0 p-2",
            ],
            'data' => [
                'theme_location' => "menu-1"
            ],
        ],
    ];
    function initialize($node){
        $innerHTML = wp_nav_menu( [
            'theme_location'=>'menu-1',
            'echo'=> false,
            'container'=>'',
            'items_wrap' => '%3$s',
            'link_class' => "text-decoration-none p-1 fw-8 bg-primary-dk text-white",
            'li_class' => "d-flex m-0 me-1"
        ] );
        $node['props']['innerHTML'] = $innerHTML;
        return $node;
    }
    function render($node){
        return [
            'open' => $this->apply_props("<menu class='{{{class}}}'>{{{innerHTML}}}", $node['props']),
            'close' => '</menu>',
        ];
    }

}