import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// const DynamicReactMarkdown = dynamic(() => import('react-markdown'));
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SyntaxHighlighterDynamic = dynamic(() => import('./SyntaxHighlighter'));
const InsideArticleAdDynamic = dynamic(
	() => import('@components/UI/V1/AddsByGoogle/InsideArticleAd'),
	{ ssr: false }
);

import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';

const Md = ({ content, addInsideArticleAd = false }) => {
	const [hasError, setHasError] = useState('');
	const [elementsCounter, setElementsCounter] = useState({
		h1: 0,
		h2: 0,
		h3: 0,
		h4: 0,
		h5: 0,
		h6: 0,
		InsideArticleAdDynamic: 0,
	});

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
		h1: ({ children }) => (
			<h1
				id={`h1_${
					children && children[0]?.replace
						? children[0].replace(/[^\w]/g, '-')
						: (() => {
								setElementsCounter((prev) => ({
									...prev,
									h1: prev.h1 + 1,
								}));
								return elementsCounter.h1;
						  })()
				}`}
			>
				{children}
			</h1>
		),
		h2: ({ children }) => {
			const showInsideArticleAd =
				addInsideArticleAd && elementsCounter.h2 % 2 === 0;

			return (
				<>
					{/* <InsideArticleAdDynamic /> */}
					{showInsideArticleAd && <InsideArticleAdDynamic />}
					<h2
						id={`h2_${
							children && children[0]?.replace
								? children[0].replace(/[^\w]/g, '-')
								: (() => {
										setElementsCounter((prev) => ({
											...prev,
											h2: prev.h2 + 1,
											InsideArticleAdDynamic: showInsideArticleAd
												? prev.InsideArticleAdDynamic + 1
												: prev.InsideArticleAdDynamic,
										}));
										return elementsCounter.h2;
								  })()
						}`}
					>
						{children}
					</h2>
				</>
			);
		},
		h3: ({ children }) => (
			<h3
				id={`h3_${
					children && children[0]?.replace
						? children[0].replace(/[^\w]/g, '-')
						: (() => {
								setElementsCounter((prev) => ({
									...prev,
									h3: prev.h3 + 1,
								}));
								return elementsCounter.h3;
						  })()
				}`}
			>
				{children}
			</h3>
		),
		h4: ({ children }) => (
			<h4
				id={`h4_${
					children && children[0]?.replace
						? children[0].replace(/[^\w]/g, '-')
						: (() => {
								setElementsCounter((prev) => ({
									...prev,
									h4: prev.h4 + 1,
								}));
								return elementsCounter.h4;
						  })()
				}`}
			>
				{children}
			</h4>
		),
		h5: ({ children }) => (
			<h5
				id={`h5_${
					children && children[0]?.replace
						? children[0].replace(/[^\w]/g, '-')
						: (() => {
								setElementsCounter((prev) => ({
									...prev,
									h5: prev.h5 + 1,
								}));
								return elementsCounter.h5;
						  })()
				}`}
			>
				{children}
			</h5>
		),
		h6: ({ children }) => (
			<h6
				id={`h6_${
					children && children[0]?.replace
						? children[0].replace(/[^\w]/g, '-')
						: (() => {
								setElementsCounter((prev) => ({
									...prev,
									h6: prev.h6 + 1,
								}));
								return elementsCounter.h6;
						  })()
				}`}
			>
				{children}
			</h6>
		),
	};

	if (hasError) {
		return <p>{hasError}</p>;
	}

	try {
		return (
			<>
				<ReactMarkdown
					// DynamicReactMarkdown
					components={customRenderers}
					remarkPlugins={[remarkGfm]}
				>
					{content}
				</ReactMarkdown>
				{addInsideArticleAd && <InsideArticleAdDynamic />}
			</>
		);
	} catch (error) {
		setHasError(error.message);
	}
};

export default Md;
