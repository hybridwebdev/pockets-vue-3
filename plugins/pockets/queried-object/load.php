<?php 
namespace pockets\queried_object {
    use \pockets\queried_object;
    class load {
        function __construct(){
            add_filter('vuejs-app/data', [ $this, 'queried_object' ], 9999999, 1 );
            add_filter('pockets/crud/rest-middleware', [$this, 'setup_queried_object']);
            add_action('wp', [$this, 'init_queried_object']);
        }
        /**
            init_queried_object is bound on wp is used to set
            the initial value when a page is loaded.
        */
        function init_queried_object(){
            $o = \pockets
                ::crud('wp-object')
                ::init( get_queried_object() )
                ->read( ['queried_object:<='] );
                
            if(!is_array($o)) return;
            queried_object::set($o);
        }
        function queried_object($data){
            $data['queried_object'] = queried_object::get();
            return $data;
        }
        /**
            queried-object is passed as part of the rest headers.
            This recieves the same array that is set in init_queried_object when the page
            is first loaded client side. This is used to "re-set" context so
            that templates etc can rely on it for context (eg page or post)
        */
        function setup_queried_object($request){
            $queried_object = $request->get_header('queried-object');
            if(!$queried_object) return $request;
            
            $queried_object = json_decode( $queried_object );
            queried_object::set((array) $queried_object);
            return $request;
        }
    }
};
namespace pockets {
    /**
        Extends global name space.
        Can be called with \pockets\queried_object::method_name
    */
    class queried_object {
        private static $queried_object = null;
        static function set(array $context ){
            list(
                'type' => $type,
                'ID' => $ID
            ) = $context;
            if(!$type || !$ID) return new \WP_Error("You must provide a type and ID");
            self::$queried_object = $context;
        }
        static function get(){
            return self::$queried_object;
        }
    }
}