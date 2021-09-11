import {
	/*PrismLight*/ Prism as SyntaxHighlighter,
} from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Component = (props) => {
	return (
		<SyntaxHighlighter
			style={vscDarkPlus}
			customStyle={{
				margin: '1.5em 0',
				padding: '0.75em',
				paddingLeft: '0',
			}}
			showLineNumbers
			lineNumberStyle={{
				borderRight: '0.1rem solid hsl(101deg 27% 40%)',
				marginRight: '1.25em',
				width: '4rem',
				padding: '0em',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			{...props}
		/>
	);
};

export default Component;
