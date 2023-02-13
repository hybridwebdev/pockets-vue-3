<?php  
namespace pockets\end_point;

class crud extends \pockets\base {
    public $endpoint = '';
    function __construct(){
        parent::__construct();
        add_action( 'rest_api_init', [ $this, 'register' ] ) ;
        add_filter( 'vuejs-app/data', [ $this, 'extend_data' ], 9999999, 1 );
    }

    function extend_data($data){
        $data['crud'] = [
            /**
                This is used in the axios connection to call back to the endpoint.
                Nonce is passed in the headers, allowing things like user role checks to work.
            */
            'nonce' => wp_create_nonce( "wp_rest" ),
            'url' => "/wp-json/pockets/v1/crud"
        ];
        return $data;
    }
  
    function register(){
        register_rest_route( "pockets", "/v1/crud", [ 
            'methods'   => 'POST',
            'callback'  => function($request) {
                
                $request = apply_filters('pockets/crud/rest-middleware', $request);

                return new \WP_REST_Response( 
                    array_map([$this, 'crud'], $request->get_params()),
                    200 
                );

            }
        ] ) ;
    }
    function crud($args){
        
        list(
            'model'    => $model,
            'action'   => $action,
            'fields'   => $fields,
            'resource' => $resource
        ) = wp_parse_args($args, [
            'model'    => false,
            'action'   => false,
            'fields'   => false,
            'resource' => false
        ] );
        
        $object = \pockets::crud($model)::init($resource);
        $fn = [$object, $action];
        if(is_callable($fn)) {
            return call_user_func($fn, $fields);
        }
        return false;

    }
}
