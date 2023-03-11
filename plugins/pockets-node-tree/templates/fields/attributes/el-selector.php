
<div v-if='schema.elTypes && schema.elTypes.length > 0'>
    <label>Element Type</label>
    <select v-model='node.el' class='form-control'>
        <option v-for='type in schema.elTypes' :value='type'>
            {{type}}
        </option>
    </select>
</div>

<p v-else class='text-danger fw-8'>
    This node's element type cannot be changed! 
</p>