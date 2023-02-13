<?php
namespace pockets_node_tree\traits;

trait node_tree_api {

    static $options = [
        'editor-active' => true
    ];

    static array $nodeParsers = [];

    static array $nodes = [
        'list' => [],
        'fields' => []
    ];

    static function get_default_node(string $text = "I am a default node template!") : array {
        return [
            'el' => 'div',
            'schema' => "node-container",
            'props' => [
                'class' => 'col-12 p-1'
            ],
            'nodes' => [
                [
                    'el' => 'p',
                    'props' => [
                        'class' => "p-1",
                        'innerHTML' => $text
                    ],
                    'schema' => "render-html"
                ]
            ]
        ];
    }

    static function getEditorData(){
        return [
            'nodes' => self::$nodes,
            'options' => self::$options
        ];
    }

    static function register_field($field) {
        if(
            is_array( $field['content'] ) 
            && 
            isset($field['content']['template'])
        ) {
            $field['content'] = \pockets::load_template( $field['content'] );
        }
        self::$nodes['fields'][] = $field;
    }

    static function render(array $source){  

        ob_start();

        if(!self::getEditorData()['options']['editor-active']) {
            echo \pockets::crud('node-tree/root')::init($source)->read( ['render'] )['root']['render'];
            return ob_get_clean();
        }

        list(
            'ID' => $ID,
            'type' => $type,
            'metaKey' => $metaKey
        ) = $source;

        $source_string = "tree_{$type}_{$ID}_{$metaKey}";
        /**
            Prefixing so that it cant start with a number and throw an error. 
        */
        \pockets::inject_data($source_string, \pockets::crud('node-tree/root')::init($source)->read( ['hydrate:<='] ) );
    ?>
        <pockets-tree-root v-bind='$pockets.data.<?= $source_string ?>'></pockets-tree-root>
    <?php
        return ob_get_clean();
    }
 
}