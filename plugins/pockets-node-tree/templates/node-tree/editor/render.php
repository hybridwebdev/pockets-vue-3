<?php 
    pockets::inject_data( 'nodeTreeEditor', \pockets\node_tree::getEditorData() );
?>
<pockets-app>
    <pockets-node-tree-editor v-bind='$pockets.data.nodeTreeEditor'></pockets-node-tree-editor>
</pockets-app>