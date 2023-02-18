<div v-if='!parent' class='text-danger fw-8 fs-20 pt-2'>
    <p class='text-center'>
        This Node cannot be changed!
    </p>
</div>
<div v-if='parent'>
    <label>Node Schema</label>
    <pockets-node-tree-schema-selector 
        v-model:selected='node.schema' 
    />
</div>
