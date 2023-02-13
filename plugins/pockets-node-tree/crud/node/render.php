<?php
namespace pockets_node_tree\crud\node;
trait render {

    private function render_walker($node){

        $model = \pockets\node_tree::$nodeParsers[$node['schema']];

        $render_data = call_user_func([$model, 'render'], $node);

        if( $render_data['open'] ?? false ) echo $render_data['open'];

            if( $render_data['innerHTML'] ?? false ) echo $render_data['innerHTML'];

            if( $node['nodes'] ?? false ) {
                array_map( [$this, 'render_walker'], $node['nodes'] );
            }

        if( $render_data['close'] ?? false ) echo $render_data['close'];

    }

    function render($iterator){
        ob_start();
            $this->render_walker( $this->hydrate($this->resource) );
        return ob_get_clean();
    }

}