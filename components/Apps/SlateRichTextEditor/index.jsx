import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import CustomEditor from './MyElement';

import CodeElement from './Elements/Code';
import DefaultElement from './Elements/Default';
import Leaf from './Elements/Leaf';

const SlateRichTextEditor = ({
	content,
	localStorageItemName,
	saveToLocalStorage,
}) => {
	const editor = useMemo(() => withReact(createEditor()), []);

	// Keep track of state for the value of the editor.
	const [value, setValue] = useState(
		content ||
			(typeof window !== 'undefined' &&
				JSON.parse(localStorage.getItem(localStorageItemName))) || [
				{
					type: 'paragraph',
					children: [{ text: '' }],
				},
			]
	);

	const renderElement = useCallback((props) => {
		switch (props.element.type) {
			case 'code':
				return <CodeElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	// Define a leaf rendering function that is memoized with `useCallback`.
	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);

	const handleOnKeyDown = (event) => {
		// event.preventDefault();

		if (!event.ctrlKey) return;

		switch (event.key) {
			// When "`" is pressed, keep our existing code block logic.
			case '`': {
				event.preventDefault();
				CustomEditor.toggleCodeBlock(editor);
				break;
			}

			// When "B" is pressed, bold the text in the selection.
			case 'b': {
				event.preventDefault();
				CustomEditor.toggleBoldMark(editor);
				break;
			}
		}
	};

	return (
		<main className='main'>
			<section>
				<header>
					<h2>slate-rich-text-editor</h2>
					<p>Render the Slate context.</p>
				</header>
				<section>
					<Slate
						editor={editor}
						value={value}
						onChange={(newValue) => setValue(newValue)}
						onChange={(value) => {
							setValue(value);

							if (saveToLocalStorage) {
								const isAstChange = CustomEditor.isAstChange(editor);

								if (isAstChange) {
									// Save the value to Local Storage.
									const content = JSON.stringify(value);
									localStorage.setItem(localStorageItemName, content);
								}
							}
						}}
					>
						<div>
							<button
								onMouseDown={(event) => {
									event.preventDefault();
									CustomEditor.toggleBoldMark(editor);
								}}
							>
								Bold
							</button>
							<button
								onMouseDown={(event) => {
									event.preventDefault();
									CustomEditor.toggleCodeBlock(editor);
								}}
							>
								Code Block
							</button>
						</div>
						<Editable
							renderElement={renderElement}
							onKeyDown={handleOnKeyDown}
							renderLeaf={renderLeaf}
							placeholder='Enter a whatever...'
							spellCheck={true}
						/>
					</Slate>
				</section>
			</section>
		</main>
	);
};

export default SlateRichTextEditor;
