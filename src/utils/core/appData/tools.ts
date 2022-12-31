const generateCommonTags = () => [
	'custom',
	'online',
	'online-tool',
	'tool',
	'free'
];

export const convertFromMarkdownToHTMLApp = {
	relativePath: 'convert-from-markdown-to-html',
	title:
		'Markdown to HTML Converter - Quickly and Easily Convert Your Markdown Text to HTML',
	description:
		'Use our simple and user-friendly Markdown to HTML converter to quickly and easily convert your markdown text to HTML. Simply type your markdown text in the textarea and see the output in real-time, and easily copy the HTML output to your clipboard.',
	tags: ['markdown', 'html', 'converter', 'convert', ...generateCommonTags()],
	mainTag: 'converter'
};

export const generateFractalTreeApp = {
	relativePath: 'generate-fractal-tree',
	title: 'Generate Beautiful Fractal Trees with Our Online Tool',
	tags: [
		'fractal-tree',
		'generator',
		'computer-generated-arts',
		'generate',
		'random',
		'design',
		'unique',
		...generateCommonTags()
	],
	mainTag: 'computer-generated-arts'
};

const toolsData = {
	basePath: '/apps',
	pages: [convertFromMarkdownToHTMLApp, generateFractalTreeApp]
};

export default toolsData;

// <meta name="revisit-after" content="7 days">: This tag tells search engines how often to revisit the page for updates.
