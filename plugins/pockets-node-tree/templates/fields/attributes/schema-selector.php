<div v-if='!parent' class='text-danger fw-8 fs-20 pt-2'>
    <p class='text-center'>
        This Node cannot be changed!
    </p>
</div>
<div v-if='parent'>
    <p class='text-danger fw-8'>Changing the schema of a node will reset it back to the default settings of the new schema</p>
    <pockets-node-tree-schema-selector 
        v-model:selected='node.schema' 
    />
</div>
