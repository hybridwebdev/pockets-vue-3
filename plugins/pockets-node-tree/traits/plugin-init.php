<?php
namespace pockets_node_tree\traits;
trait plugin_init {
    function __construct(){
        parent::__construct();
        add_action('wp_footer', [$this, 'render_editor'], 1, 1);   
        add_filter('pockets/template-locations', [$this, 'add_template_location'], 11, 1);
        add_action( "init", [$this, 'load_dependencies']);
    }
    function load_dependencies(){
        new \pockets\utils\register_cpt('pockets-node-tree', 'Pockets Templates', [
            'has_archive' => false,
            'menu_position' => 99,
        ]);
        new \pockets_node_tree\crud\load;
        new \pockets_node_tree\nodes\load;
        new \pockets_node_tree\fields\load;
        
    }
    function render_editor(){
        if(!\pockets\node_tree::getEditorData()['options']['editor-active']) return;
        echo \pockets::load_template( ['template' => 'node-tree/editor/render']);
    }
    function add_template_location(array $templates) {
        return [
            ...$templates,
            $this->dir
        ];
    }
}