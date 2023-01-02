const generateCommonTags = () => [
	'custom',
	'online',
	'tool',
	'free',
	'website'
];

export const convertFromMarkdownToHTMLTool = {
	relativePath: 'convert-from-markdown-to-html',
	title:
		'Markdown to HTML Converter - Quickly and Easily Convert Your Markdown Text to HTML',
	shortTitle: 'Markdown to HTML Converter',
	description:
		'Use our simple and user-friendly Markdown to HTML converter to quickly and easily convert your markdown text to HTML. Simply type your markdown text in the textarea and see the output in real-time, and easily copy the HTML output to your clipboard.',
	shortDescription:
		'Convert markdown text to HTML with our user-friendly tool.',
	tags: ['markdown', 'html', 'converter', 'convert', ...generateCommonTags()],
	mainTag: 'converter'
};

export const textToURLSlugConverterTool = {
	relativePath: 'text-to-url-slug-converter',
	title:
		'Text to URL Slug Converter - Convert your text to a unique and SEO-friendly URL slug',
	shortTitle: 'Text to URL Slug Converter',
	description:
		'Easily convert your text to a unique and SEO-friendly URL slug with our online converter tool. Simply type your text into the input field and copy the generated slug to use on your website or blog.',
	shortDescription:
		'Convert your text to a unique and SEO-friendly URL slug with our online converter tool.',
	tags: [
		'slug',
		'url',
		'text',
		'converter',
		'convert',
		...generateCommonTags()
	],
	mainTag: 'converter'
};

export const textToQRCodeConverterTool = {
	relativePath: 'text-to-qr-code-converter',
	title: '',
	shortTitle: 'Text to QR Code Converter',
	description: '',
	shortDescription: '',
	tags: ['markdown', 'html', 'converter', 'convert', ...generateCommonTags()],
	mainTag: ''
};

export const generateFractalTreeTool = {
	relativePath: 'generate-fractal-tree',
	title: 'Generate Beautiful Fractal Trees with Our Online Tool',
	shortTitle: 'Fractal Tree Generator',
	description:
		'Our online tool allows you to generate stunning fractal trees with custom parameters or randomly generated values. Explore the infinite possibilities of fractal tree design and create your own unique creations!',
	shortDescription:
		'Generate beautiful fractal trees with custom or random parameters with our online tool.',
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
	basePath: '/tools',
	pages: [
		textToURLSlugConverterTool,
		textToQRCodeConverterTool,
		convertFromMarkdownToHTMLTool,
		generateFractalTreeTool
	]
};

export default toolsData;

// <meta name="revisit-after" content="7 days">: This tag tells search engines how often to revisit the page for updates.
/*
export const tempTool = {
	relativePath: '',
	title: '',
	shortTitle: '',
	description: '',
	shortDescription: '',
	tags: ['markdown', 'html', 'converter', 'convert', ...generateCommonTags()],
	mainTag: ''
};
*/
