<?php 
namespace pockets\crud\posts;
class read_model extends \pockets\crud\resource {
    use \pockets\crud\render;
    /**
        You can extend this model and modify 
        $post_type_model to change what crud model this will read the items from.
    */
    public $post_type_model = 'post';
    function items($iterator){
        return array_map(function($post) use($iterator) {
            return \pockets::crud($this->post_type_model)::init($post)->read($iterator->value);
        }, $this->resource->posts ?? [] );
    }

    function IDS($iterator){
        return array_map(function($post) {
            return $post->ID;
        }, $this->resource->posts ?? [] );
    }

    function pagination($iterator){
        
        $data = [
            'paged' => $this->resource->query['paged'] ?? 1,
            'pages' => $this->resource->max_num_pages,
        ];
        
        /**
            Boundary Check
        */
        if(
            !is_numeric($data['paged']) 
            || $data['paged'] > $data['pages'] 
            || $data['paged'] < 1
        ) $data['paged'] = 1;

        $data['prev'] = $data['paged'] == 1 ? 1 : $data['paged'] - 1;

        $data['next'] = $data['paged'] == $data['pages'] ? $data['paged'] : $data['paged'] + 1;

        return $data;
    }

}