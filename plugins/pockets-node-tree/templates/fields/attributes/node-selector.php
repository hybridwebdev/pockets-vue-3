<div v-if='initialize.self'>
    <label>Node Schema</label>
    <pockets-node-tree-schema-selector 
        v-model:selected='node.schema' 
        @update:selected='initialize.self'
    />
</div>
