<?php
namespace pockets\vue;
class load {
	public $role = 'administrator';
	public $localhost = 'http://localhost:8080/';
	function __construct(){
		$this->url = plugin_dir_url(__DIR__."/vue/");
		$this->dir = plugin_dir_path(__DIR__."/vue/");
		add_action('init', [$this, 'initConfig']);
		/**
		* has to be done on init hook so things like is_admin can work 
		*/
		add_action( 'admin_footer', [$this, 'load_assets']);
		add_action( 'admin_head', [$this, 'meta_tag']);
		add_action( 'wp_head', [$this, 'meta_tag'] );
		add_action( 'wp_footer', [$this, 'load_assets']);
	}
	function meta_tag(){ 
		
		/**
			Adding a meta tag to the head so that the vue instance can read it
			and use it to set __webpack_public_path__. This is so webpack can properly
			determine where to look for async chunks. This is completely safe as meta
			tags are immutable once parsed by the browser. This also means not having to
			rely on passing a value via window which would be ugly and insecure. 
		*/
	?>
		<meta name="pockets-vue" content="<?= $this->vue_config['host'] ?>"/>
	<?php }
    function initConfig(){

		$is_dev = isset( wp_get_current_user()->caps[ $this->role ] );
		
		$this->vue_config = [
			'mode' => $is_dev ? "host" : "build"
		];

		$map = [
			'host' => $this->localhost,
			'build' => "{$this->url}/dist/",
		];

		$this->vue_config['host'] = $map[$this->vue_config['mode']];

    }
	function load_config_file($path){
        return json_decode( @file_get_contents($path), true );
    }
	function get_dev_assets(){
		$host = $this->vue_config['host'];
		return [
			'app.js' => "{$host}js/app.js",
			'chunk-vendors.js' => "{$host}js/chunk-vendors.js",
			'app.css' => false,
			'chunk-vendors.css' => false
		];
	}
	function get_built_assets(){
		$manifest = $this->load_config_file("{$this->dir}/dist/manifest.json" );
		$host = $this->vue_config['host'];
		$chunk_vendors = $manifest['chunk-vendors.js'] ?? false;
		return [
			'app.js' => "$host{$manifest['app.js']}",
			'chunk-vendors.js' => $chunk_vendors ? "$host{$chunk_vendors}" : false,
			'app.css' => $manifest['app.css'] ?? false 
				? "$host{$manifest['app.css']}"
				: false,
			'chunk-vendors.css' => $manifest['chunk-vendors.css'] ?? false 
				? "$host{$manifest['chunk-vendors.css']}"
				: false,
		];
	}
	function load_assets(){
		
		$paths = $this->vue_config['mode'] == 'host'
			? $this->get_dev_assets()
			: $this->get_built_assets();
			
		wp_enqueue_script( 'vuejs-app', $paths['app.js'], [], null, true );

		wp_localize_script('vuejs-app', 'pocketsData', apply_filters( 'vuejs-app/data', []));

		if($paths['chunk-vendors.js']) {
			wp_enqueue_script( 'vuejs-chunk', $paths['chunk-vendors.js'], ['vuejs-app'], null, true );
		}

		if($paths['app.css']) {
			wp_enqueue_style("vuejs-app-css", $paths['app.css']);
		}
		if($paths['chunk-vendors.css']) {
			wp_enqueue_style("vuejs-app-css", $paths['chunk-vendors.css']);
		}
	}
}
