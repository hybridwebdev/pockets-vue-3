//@ts-nocheck
import { Extension } from "@tiptap/core"

import {
	NodeSelection,
} from "prosemirror-state"

let isNodeSelection = ( selection ) =>  selection instanceof NodeSelection

let createBlockSelection = (doc: ProsemirrorNode, pos: number)  => NodeSelection.create(doc, pos)  

let selectPrev = () => {

} 
 
const selectParent: SelectionAction = (state) => {
	const { $from } = state.selection
	if ($from.depth <= 0) return
	const pos = $from.before()
	return createBlockSelection(state.doc, pos)
}

function selectionCommmand( action: SelectionAction, capture: boolean = false ) {
	return ( { editor } ) => {
		// editor.commands.selectParentNode()
		//editor.commands.setNodeSelection(3);
		//console.log(editor.state.selection)
		// editor.commands.selectParent()
		// let t = selectParent(editor.state)
		// console.log(t.node.type.name)
		return true
	}
}

export default Extension.create({
	name: "Mike Matei Live",
	addKeyboardShortcuts () {
		return {
			ArrowUp: selectionCommmand(selectPrev, true)
		}
	},
})