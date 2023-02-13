<?php
/*
 * Plugin Name: Pockets Node Tree
 * Description: Its really cool
 * Version:     1.0
 * Author:      Justin L
 * Author URI:  justin
 * License:     Private
 * Requires PHP: 8
 */
namespace pockets_node_tree {
   
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
   
   class base {
      function __construct(){
         $this->dir = plugin_dir_path( __FILE__ );
      }
   }

   class init extends base {
      use \pockets_node_tree\traits\plugin_init;
   }

   new init;

}

namespace pockets {
   /**
      Exposes pockets_node_tree as a public api in the pockets namespace;
      eg \pockets\node_tree::method
   */ 
   class node_tree {
      use \pockets_node_tree\traits\node_tree_api;
   }
   
}