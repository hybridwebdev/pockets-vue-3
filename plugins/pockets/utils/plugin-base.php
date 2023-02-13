<?php
namespace pockets\utils;
trait trait_template {
    
    static $templates_root_path = "/templates/";
    static $templates_cached = false;

    static function get_template_locations(){
        return apply_filters( 'pockets/template-locations', [] );
    }
    /**
        locate_template - 
        This function is an immitation of wordpresses equivalent, with
        one small difference. It also looks in a filterable list of folders, 
        allowing developers to add their own set of templates for use.
    */
    static function locate_template( $paths ){
        $match = false;
        foreach( (array) $paths as $path) {
            foreach( self::get_template_locations() as $location){
                $template = $location.self::$templates_root_path.$path.".php";
                if( file_exists( $template ) ){
                    $match = $template;
                    if($match) break;
                }
            }
            if($match) break;
        }
        return $match;
    }
    static function load_template(array $data){
        if(!isset($data['template'])) return;
        $template = self::locate_template($data['template']);
        if(!$template) return;
        ob_start();
            require($template);
        return ob_get_clean();
    }

    static function get_templates_from_dir($dir, $collected_paths = [] ){

        $iterator = new \RecursiveDirectoryIterator($dir);
        $iterator->setFlags(\RecursiveDirectoryIterator::SKIP_DOTS);
        $objects = new \RecursiveIteratorIterator($iterator);
        
        $paths = array_values( iterator_to_array($objects) );

        return array_reduce( $paths, function($acc, $o) use($dir) {
            
            $path = $o->getpathName();
            $template_path = str_replace($dir, "", $path );

            $ext = strtolower( substr($template_path, -4) );
            if( $ext != '.php') return $acc;

            $file_contents = file_get_contents( $path );

            preg_match( '|Template Name:(.*)$|mi', $file_contents, $template_name );
            preg_match( '|Template Supports:(.*)$|mi', $file_contents, $template_supports );
            
            $name = _cleanup_header_comment($template_name[1] ?? false);
            if( !$name ) return $acc;

            $supports = explode(",", (string) _cleanup_header_comment($template_supports[1] ?? "generic-template") );

            $final_path = str_replace($ext, "", $template_path);

            $acc[$final_path] = [
                'name' => $name,
                'supports' => $supports,
                'path' => $final_path,
            ];

            return $acc;

        }, $collected_paths);

    }

    static function get_available_templates($supports_filter = false ) {
        
        if(!self::$templates_cached) {

            $locations = self::get_template_locations();

            self::$templates_cached = array_reduce($locations, function($acc, $location){
                return self::get_templates_from_dir($location.self::$templates_root_path, $acc);
            }, []);

        }

        if($supports_filter) {
            return array_filter(self::$templates_cached, function($template) use($supports_filter) {
                $array = array_intersect($template['supports'], (array)$supports_filter);
                return count($array) > 0;
            } );
        }

        return self::$templates_cached;

    }

}

trait plugin_base {
    
    use trait_template;

    static function loader($deps){
        return array_map(function($dep){
            $d = "pockets\\{$dep}";
            new $d;
        }, $deps);
    }

    static function crud($model_name){
        return \pockets\crud\model::get($model_name);
    }

    static function inject_data(string $key, mixed $data){
        add_filter( "vuejs-app/data", function($filtered) use($key, $data) {
            $filtered[$key] = $data;
            return $filtered;
        }); 
    }

}