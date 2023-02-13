<?php 

get_header();
 
$queried_object = \pockets::crud('wp-object')
  ::init( \pockets\queried_object::get() )
  ->read(['queried_object:<=']);

echo \pockets\node_tree::render( [
  'metaKey' => 'body'
] + $queried_object );

get_footer();
