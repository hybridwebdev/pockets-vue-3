<?php
namespace pockets_node_tree\crud;
class load {
    function __construct(){
        \pockets_node_tree\crud\tree\model::register();
        \pockets_node_tree\crud\node\model::register();
    }
}