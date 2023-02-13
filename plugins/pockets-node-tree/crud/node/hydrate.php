<?php
namespace pockets_node_tree\crud\node;

class hydrate_walker {
    static function init($config){
        $o = new static();
        list(
            'method' => $o->method
        ) = $config;
        return $o;
    }
    function walk($node){
        $model = \pockets\node_tree::$nodeParsers[$node['schema']];

        $fn = [$model, $this->method];
        if(!is_callable($fn)) $node;
        $node = call_user_func($fn, $node);

        if( $node['nodes'] ?? false ) {
            $node['nodes'] = array_map( [$this, 'walk'], $node['nodes'] );
        }

        return $node; 
    }
}
trait hydrate {
    function hydrate($iterator){
        return hydrate_walker::init(['method' => 'hydrate'])->walk($this->resource);
    }
    function initialize($iterator) {
        return hydrate_walker::init(['method' => 'initialize'])->walk($this->resource);
    }
    function sanitize($iterator) {
        return hydrate_walker::init(['method' => 'sanitize'])->walk($this->resource);
    }
}