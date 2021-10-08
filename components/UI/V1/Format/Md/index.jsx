import dynamic from 'next/dynamic';
import Link from 'next/link';
// const DynamicReactMarkdown = dynamic(() => import('react-markdown'));
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SyntaxHighlighterDynamic = dynamic(() => import('./SyntaxHighlighter'));
const DynamicHorizontalPhotoAd1 = dynamic(
	() => import('@components/UI/V1/AddsByGoogle/DisplayAd/Horizontal/PhotoAd1'),
	{ ssr: false }
);

import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';

const Md = ({ content, addHorizontalPhotoAd11 = false }) => {
	// const [elementsCounter, setElementsCounter] = useState({
	// 	h1: 0,
	// 	h2: 0,
	// 	h3: 0,
	// 	h4: 0,
	// 	h5: 0,
	// 	h6: 0,
	// 	HorizontalPhotoAd1Dynamic: 0,
	// });

	const elementsCounter = {
		h1: 0,
		h2: 0,
		h3: 0,
		h4: 0,
		h5: 0,
		h6: 0,
		HorizontalPhotoAd1Dynamic: 0,
	};

	const customRenderers = {
		img(image) {
			return <LazyLoadImage src={image.src} alt={image.alt} effect='blur' />;
		},

		a({ href, children, node }) {
			// lognmaze.com

			if (
				href.startsWith('/') ||
				// href.startsWith('http://lognmaze.com') ||
				href.startsWith('https://lognmaze.com') ||
				// href.startsWith('http://www.lognmaze.com') ||
				href.startsWith('https://www.lognmaze.com') ||
				href.startsWith('https://lognmaze.vercel.app')
			) {
				return (
					<Link href={href} prefetch={false} passHref>
						<a className='text-glow-special' title={node.children[0].value}>
							{children}
						</a>
					</Link>
				);
			}

			return (
				<a
					className='text-glow-special'
					href={href}
					title={node.children[0].value}
					target='_blank'
					rel='noopener noreferrer'
				>
					{children}
				</a>
			);
		},

		code({ node, inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || '');

			return !inline && match ? (
				<SyntaxHighlighterDynamic language={match[1]} PreTag='div' {...props}>
					{String(children).replace(/\n$/, '')}
				</SyntaxHighlighterDynamic>
			) : (
				<code className={className} {...props} data-code-inline='true'>
					{children}
				</code>
			);
		},
		h1: ({ children }) => {
			elementsCounter.h1++;

			return (
				<h1
					id={`h1_${
						children && children[0]?.replace
							? children[0].replace(/[^\w_]/g, '-')
							: elementsCounter.h1
					}`}
				>
					{children}
				</h1>
			);
		},
		h2: ({ children }) => {
			const showHorizontalPhotoAd1 =
				elementsCounter.h2++ &&
				addHorizontalPhotoAd11 &&
				(elementsCounter.h2 === 2 || elementsCounter.h2 % 3 === 0) &&
				++elementsCounter.HorizontalPhotoAd1Dynamic;

			return (
				<>
					{showHorizontalPhotoAd1 ? <DynamicHorizontalPhotoAd1 /> : ''}
					<h2
						id={`h2_${
							children && children[0]?.replace
								? children[0].replace(/[^\w_]/g, '-')
								: elementsCounter.h2
						}`}
					>
						{children}
					</h2>
				</>
			);
		},
		h3: ({ children }) => {
			elementsCounter.h3++;

			return (
				<h3
					id={`h3_${
						children && children[0]?.replace
							? children[0].replace(/[^\w_]/g, '-')
							: elementsCounter.h3
					}`}
				>
					{children}
				</h3>
			);
		},
		h4: ({ children }) => {
			elementsCounter.h4++;

			return (
				<h4
					id={`h4_${
						children && children[0]?.replace
							? children[0].replace(/[^\w_]/g, '-')
							: elementsCounter.h4
					}`}
				>
					{children}
				</h4>
			);
		},
		h5: ({ children }) => {
			elementsCounter.h5++;

			return (
				<h5
					id={`h5_${
						children && children[0]?.replace
							? children[0].replace(/[^\w_]/g, '-')
							: elementsCounter.h5
					}`}
				>
					{children}
				</h5>
			);
		},
		h6: ({ children }) => {
			elementsCounter.h6++;

			return (
				<h6
					id={`h6_${
						children && children[0]?.replace
							? children[0].replace(/[^\w_]/g, '-')
							: elementsCounter.h6
					}`}
				>
					{children}
				</h6>
			);
		},
	};

	return (
		<>
			<ReactMarkdown
				// DynamicReactMarkdown
				components={customRenderers}
				remarkPlugins={[remarkGfm]}
			>
				{content}
			</ReactMarkdown>
			{addHorizontalPhotoAd11 ? <DynamicHorizontalPhotoAd1 /> : ''}
		</>
	);
};

export default Md;
