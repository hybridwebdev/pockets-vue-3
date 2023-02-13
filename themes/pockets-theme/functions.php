<?php
namespace basetheme;
class base {
     function __construct () {
          $this->dir = get_template_directory();
          $this->url = get_template_directory_uri();
          $this->version = 1;
     }
}
class baseTheme extends base {
     function __construct () {
          parent::__construct();
          add_action( "wp_enqueue_scripts", [$this, 'load_base_assets'], 10, 1);
          add_action( "admin_enqueue_scripts", [$this, 'load_base_assets'], 10, 1);
          add_action( 'after_setup_theme', [$this, 'setup'] );
          
          add_filter('nav_menu_link_attributes', [$this, 'add_link_class'], 1, 3);
          add_filter('nav_menu_css_class', [$this, 'add_li_class'], 1, 3);
          remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
          remove_action( 'wp_print_styles', 'print_emoji_styles' );
     }
     function add_li_class($classes, $item, $args) {
          if (isset($args->li_class)) {
               $classes[] = $args->li_class;
          }
          return $classes;
     }
     function add_link_class($classes, $item, $args) {
          if (isset($args->link_class)) {
               $classes['class'] = $args->link_class;
          }
          return $classes;
     }

     function setup() {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		register_nav_menus([
			'menu-1' => esc_html__( 'Primary', '_s' ),
               'menu-2' => esc_html__( 'Mobile', '_s' ),
		]);
	}
     function load_base_assets(){
          wp_enqueue_style('base-theme-site', "{$this->url}/assets/css/styles.css", false, $this->version);
          //wp_enqueue_script('bs-is-bs', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js");
     }

}
new baseTheme(); 

class test {

     function __construct(){
          add_action( 'edit_form_after_title', [$this, 'add_content_before_editor'] );
     }

     function add_content_before_editor() {?>
          <h1>DEMO APP</h1>
          <pockets-app app-root>
               <demo-app>
                    <h1>Hello World</h1>
                    <template #named-slot>
                         <demo-store></demo-store>
                    </template>
               </demo-app>
          </pockets-app>
     <?php }

    
}
new test;