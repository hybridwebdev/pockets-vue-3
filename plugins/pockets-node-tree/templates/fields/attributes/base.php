<div class='grid columns-2 gap-1'>
    <div>
        <label class='fw-8'>Class</label>
        <input v-model='node.props.class' class='form-control'>
    </div>
    <div>
        <label class='fw-8'>ID</label>
        <input v-model='node.props.id' class='form-control'>
    </div>
</div>

<div>
    <select v-model='node.el'>
        <option value='div'>DIV</option>
        <option value='span'>SPAN</option>
        <option value='ol'>ol</option>
        <option value='li'>li</option>
    </select>
</div>
