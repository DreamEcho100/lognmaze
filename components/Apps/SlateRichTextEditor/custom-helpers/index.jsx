import { Editor, Text, Transforms } from 'slate';

const CustomEditor = {
	isBoldMarkActive: (editor) => {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.bold === true,
			universal: true,
		});

		return !!match;
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
};

export default CustomEditor;
