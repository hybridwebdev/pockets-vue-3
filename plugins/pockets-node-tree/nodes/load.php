<?php
namespace pockets_node_tree\nodes;
class load {
    function __construct(){
        \pockets_node_tree\nodes\render_html\node::init();
        \pockets_node_tree\nodes\youtube\node::init();
        \pockets_node_tree\nodes\image\node::init();
        \pockets_node_tree\nodes\container\node::init();
        
        \pockets_node_tree\nodes\post\node::init();
        \pockets_node_tree\nodes\wp_nav_menu\node::init();
        
    }
}