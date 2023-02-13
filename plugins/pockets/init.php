<?php
/*
 * Plugin Name: Pockets
 * Description: Its really cool
 * Version:     1.0
 * Author:      Justin L
 * Author URI:  justin
 * License:     Private
 * Requires PHP: 8
 */

namespace pockets {
	class base {
		function __construct(){
			$this->dir = plugin_dir_path( __FILE__ );
		}
	}
	spl_autoload_register( function($filename) {
		$__class_base = __NAMESPACE__;
		$__dir = plugin_dir_path( __FILE__ );
		$class_target = explode('\\', str_ireplace('_', '-', untrailingslashit( $filename ) ) );
		if( str_replace("-", "_", $class_target[0]) != $__class_base ) return;
		array_shift($class_target); // pops off
		$chunks = implode('/', $class_target);
		$file = "{$__dir}/{$chunks}.php";
		if ( is_file($file) ) require_once($file);
	} );
}; 

namespace {
	
	class pockets extends \pockets\base {

		/**
		* pockets is a global class with static methods that provide a variety of tools. 
		*/
		use \pockets\utils\plugin_base;	
		function __construct(){
			
			parent::__construct();

			add_filter('pockets/template-locations', function(){
				return [
					$this->dir, // plugin
					get_template_directory() // theme
				];
			});

			pockets::loader([
				/**
				* bootstrapping modules
				*/
				'crud\load',
				'vue\load',
				'end_point\load',
				'queried_object\load',
			]);

		}
	}

	new pockets;

	
}
