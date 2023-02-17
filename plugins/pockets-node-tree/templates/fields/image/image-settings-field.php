<?php 
    $sizes = \pockets::crud('site')::init([])->read(['image_sizes:<=']); 
    $render_sizes = function($size) {
        echo "<option value='{$size}'>{$size}</option>";
    };
?>

<div class='mb-1 grid columns-2 gap-1'>
    <div>
        <label>
            Source
        </label>
        
        <select v-model='node.data.source' class='form-control' @change='hydrate.self'>
            <option value='remote'>Remote</option>
            <option value='media'>Media Library</option>
        </select>
    </div>
    
    <div
        v-if='node.data.source=="media"'
    >
        <label>
            Size
        </label>
        
        <select class='form-control' @change='hydrate.self' v-model='node.data.size'>
            <?php array_map($render_sizes, $sizes) ?>
        </select>
        
    </div>

    <div v-if='node.data.source=="remote"'>
        
        <label>
            URL
        </label>
        <input v-model='node.props.src' class='form-control'>
        
    </div>

</div>

<div v-if='node.data.source=="media"'>
    <wp-media v-model:selected='node.data.ID' @update:selected='hydrate.self'></wp-media>
</div>
<button @click='hydrate.self'>Hydrate</button>