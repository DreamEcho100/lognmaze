import type { FC } from 'react';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Component: FC<SyntaxHighlighterProps> = (props) => {
	return (
		<SyntaxHighlighter
			style={vscDarkPlus}
			showLineNumbers
			{...props}
			lineNumberStyle={{
				borderRight: '0.1rem solid hsl(101deg 27% 40%)',
				marginRight: '1.25em',
				width: '4rem',
				padding: '0em',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				...(props.lineNumberStyle || {})
			}}
		/>
	);
};

export default Component;
