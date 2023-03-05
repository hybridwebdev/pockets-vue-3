<div class='grid columns-2 gap-1'>
    <div>
        <label>Source</label>
        <select v-model='node.data.source' class='form-control' @change='hydrate.active'>
            <option value='queried_object'>
                Automatic
            </option>
            <option value='post'>
                Post
            </option>
        </select>
    </div>
    <div>
        <label>Field</label>
        <select v-model='node.data.field' class='form-control' @change='hydrate.active'>
            <option value='title'>
                Title
            </option>
            <option value='content'>
                Content
            </option>
        </select>
    </div>
</div>