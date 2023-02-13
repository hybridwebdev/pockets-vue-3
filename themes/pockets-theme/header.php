<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
        <?php wp_head() ?>
    </head>
    <body>
        <pockets-app class='root-app'>
        <?php 
            echo \pockets\node_tree::render( [
                'metaKey' => 'template',
                'type' => 'post',
                'ID' => 61
            ]);