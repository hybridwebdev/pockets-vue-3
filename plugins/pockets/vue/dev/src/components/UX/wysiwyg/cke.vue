<template lang='pug'>

ckeditor( :editor='editor' tagName='div' class='bg-grey-lt p-2')

</template>
<script lang='ts'>
  
  import { ref } from "vue"
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-inline';
  console.log(CKEditor)
  export default {
      components: {
          // Use the <ckeditor> component in this view.
          ckeditor: CKEditor.component
      },
      data() {
          return {
              editor: ClassicEditor,

              // ...
          };
      }
  }

</script>
<style lang='scss'>
.editor-wrapper {
  .ProseMirror {
    padding: 10px;
    outline: none;
    background: var(--bs-grey-lt)
  }
}
</style>