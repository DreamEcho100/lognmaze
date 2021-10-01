import { Editor, Element, Node, Text, Transforms } from 'slate';

export const CustomEditor = {
	...Element,
	isBoldMarkActive: (editor) => {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.bold === true,
			universal: true,
		});

		return !!match;
	},

	isAstChange: (editor) => {
		return editor.operations.some((op) => 'set_selection' !== op.type);
	},

	isCodeBlockActive: (editor) => {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === 'code',
		});

		return !!match;
	},

	toggleBoldMark: (editor) => {
		const isActive = CustomEditor.isBoldMarkActive(editor);
		Transforms.setNodes(
			editor,
			{ bold: isActive ? null : true },
			{ match: (n) => Text.isText(n), split: true }
		);
	},

	toggleCodeBlock: (editor) => {
		const isActive = CustomEditor.isCodeBlockActive(editor);
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : 'code' },
			{ match: (n) => Editor.isBlock(editor, n) }
		);
	},

	// Define a serializing function that takes a value and returns a string.
	serialize: (value) => {
		return (
			value
				// Return the string content of each paragraph in the value's children.
				.map((n) => Node.string(n))
				// Join them all with line breaks denoting paragraphs.
				.join('\n')
		);
	},

	// Define a deserializing function that takes a string and returns a value.
	deserialize: (string) => {
		// Return a value array of children derived by splitting the string.
		return string.split('\n').map((line) => {
			return {
				children: [{ text: line }],
			};
		});
	},
};

export default CustomEditor;
