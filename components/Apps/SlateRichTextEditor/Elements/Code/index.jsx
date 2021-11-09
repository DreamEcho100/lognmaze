// Define a React component renderer for our code blocks.
const CodeElement = ({ attributes, children }) => {
	return (
		<pre {...attributes}>
			<code>{children}</code>
		</pre>
	);
};

export default CodeElement;
