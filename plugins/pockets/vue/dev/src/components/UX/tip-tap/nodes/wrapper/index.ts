import Paragraph from '@tiptap/extension-paragraph';

export default Paragraph.extend({
    parseHTML() {
        return [
            { tag: 'p' }
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['ass', HTMLAttributes, 0]
    },
})