<template lang='pug'>

ckeditor( :editor='editor' tagName='div')

</template>
<script lang='ts'>
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-inline';
  export default {
      components: {
          ckeditor: CKEditor.component
      },
      data() {
          return {
              editor: ClassicEditor,
          };
      }
  }

</script>
