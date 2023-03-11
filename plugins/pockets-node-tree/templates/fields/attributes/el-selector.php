
<div>
    <label>Element Type</label>
    <select v-model='node.el' class='form-control'>
        <option v-for='type in schema.elTypes' :value='type'>
            {{type}}
        </option>
    </select>
</div>
