<?php
namespace pockets\crud;

class model {
    use implementation;
    use publicApi;
}

trait publicApi {

    /**
        Exposes all extendable methods for class.
    */

    /**
        Model name will be used to track crud models. 
        @type string
    */
    public static $model_name; 
    /**
        Request becomes the extending classes pseudo contructor, being invoked every time 
        ::init is called.
        This should be used to do setup like fetch a resource using the $resource
        argument that can be used by crud methods.
    */
    function request($resource = null) {}

    /**
        For crud methods, query should be an array containing the values you want to use for that action.
        Eg for a post you'd pass in ['title'] which would map to the resources post title.
    */
    public function create(array $query){}
    public function   read(array $query){}
    public function update(array $query){}
    public function delete(array $query){}
    
}

trait implementation {

    /**
        Internal implementation logic. This should not be touched by extending clases.
    */

    /**
        $models is an array of all models that extend this class.
        eg: ['post' => reference to post model class ]
    */
    private static array $models = [];
    
    /**
        @function init 
        
        Serves as the public api for a model.
        It invokes the models request method and then returns 
        the instance for chaining.
        Eg model::init($resource)->create($query);
    */
    final static function init($resource = null){
        $instance = new static;
        $instance->request($resource);
        return $instance;
    }

    function error($message, mixed $data = null){
        $error = new \WP_Error;
        $error->add('message', $message, $data);
        return $error;
    }
    
    /**
        @function register
        used to add model to global registry.
        The model can then be called like so:

        \crud\model::get(model_name)

        this will return the related crud model.
        If the model is not found, it will return a wp_error instance.
        
    */

    final static function register(){

        self::$models[static::$model_name] = static::class;

    }

    final static function get(string $model_name ){
        return self::$models[$model_name] ?? self::init()->error("Model Not Found", [$model_name]);
    }

}
