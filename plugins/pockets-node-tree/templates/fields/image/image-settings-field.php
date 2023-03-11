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
        
        <select v-model='node.data.source' class='form-control' @change='hydrate.active'>
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
        
        <select class='form-control' @change='hydrate.active' v-model='node.data.size'>
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
    <pockets-popup-menu  
        :autoHide="true"
        :triggers='["click"]'
        :delay='0'
        :positioning-disabled="true"
    >
        
        <div class='bg-grey-lt grid columns-1 gap-1 p-2' role='button'>
            <img :src='node.props.src' class='img-fluid mx-auto mh-150px'>
            <button class='btn btn-accent-dk rounded-0'>Select Image</button>
        </div>
        <template #popper>
            <div class='p-2 bg-white mx-auto mw-md overflow-hidden'>
                <wp-media v-model:selected='node.data.ID' @update:selected='hydrate.active'></wp-media>
            </div>
        </template>
    </pockets-popup-menu>
</div>
