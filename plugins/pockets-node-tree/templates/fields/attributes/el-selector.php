
<div v-if='schema.elTypes && schema.elTypes.length > 0'>
    <label>Element Type</label>
    <select v-model='node.el' class='form-control'>
        <option v-for='type in schema.elTypes' :value='type'>
            {{type}}
        </option>
    </select>
</div>

<div v-else>
    SNAH
</div>