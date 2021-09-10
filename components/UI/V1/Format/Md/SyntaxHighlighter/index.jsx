import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Component = (props) => {
	return <SyntaxHighlighter style={vscDarkPlus} {...props} />;
};

export default Component;
