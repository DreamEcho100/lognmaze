import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// const DynamicReactMarkdown = dynamic(() => import('react-markdown'));
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SyntaxHighlighterDynamic = dynamic(() => import('./SyntaxHighlighter'));

import Image from '@components/UI/V1/Image';

const Md = ({ content }) => {
	const [hasError, setHasError] = useState(false);

	const customRenderers = {
		img(image) {
			return (
				<Image
					src={image.src}
					alt={image.alt}
					style={{ width: '100%', maxWidth: '50rem', maxHeight: '30rem' }}
					loading='lazy'
				/>
			);
		},

		/*
		p({ children, node }) {
			if (node.children[0].tagName === 'img') {
				const image = node.children[0];
				// let imgSrc;

				// if (
				// 	/^https:\/\//.test(image.properties.src) ||
				// 	/^http:\/\//.test(image.properties.src)
				// ) {
				// 	imgSrc = image.properties.src;
				// } else {
				// 	imgSrc = `/images/News/${news.slug}/${image.properties.src}`;
				// }

				return (
					<div className={classes.image}>
						<Image
							src={image.properties.src}
							alt=''
							style={{ width: '100%', maxWidth: '50rem', maxHeight: '30rem' }}
							loading='lazy'
						/>
					</div>
				);
			}

			return <p>{children}</p>;
		},
		*/

		a({ href, children, node }) {
			if (href.startsWith('http://') || href.startsWith('https://')) {
				return (
					<a
						className='text-glow-special'
						href={href}
						title={node.children[0].value}
						// target='_blank' rel='noopener noreferrer'
					>
						{children}
					</a>
				);
			}

			return (
				<Link href={href}>
					<a
						className='text-glow-special'
						title={node.children[0].value}
						// target='_blank' rel='noopener noreferrer'
					>
						{children}
					</a>
				</Link>
			);
		},

		code({ node, inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || '');

			return !inline && match ? (
				<SyntaxHighlighterDynamic
					language={match[1]}
					PreTag='div'
					children={String(children).replace(/\n$/, '')}
					{...props}
				/>
			) : (
				<code className={className} {...props} />
			);
		},
		h1: ({ children, ...props }) => (
			<h1
				id={`h1_${
					children && /* children[0] && */ children[0].replace(/[^\w]/g, '-')
				}`}
			>
				{children}
			</h1>
		),
		h2: ({ children, ...props }) => (
			<h2
				id={`h2_${
					children && /* children[0] && */ children[0].replace(/[^\w]/g, '-')
				}`}
			>
				{children}
			</h2>
		),
		h3: ({ children, ...props }) => (
			<h3
				id={`h3_${
					children && /* children[0] && */ children[0].replace(/[^\w]/g, '-')
				}`}
			>
				{children}
			</h3>
		),
		h4: ({ children, ...props }) => (
			<h4
				id={`h4_${
					children && /* children[0] && */ children[0].replace(/[^\w]/g, '-')
				}`}
			>
				{children}
			</h4>
		),
		h5: ({ children, ...props }) => (
			<h5
				id={`h5_${
					children && /* children[0] && */ children[0].replace(/[^\w]/g, '-')
				}`}
			>
				{children}
			</h5>
		),
		h6: ({ children, ...props }) => (
			<h6
				id={`h6_${
					children && /* children[0] && */ children[0].replace(/[^\w]/g, '-')
				}`}
			>
				{children}
			</h6>
		),
	};

	if (hasError) {
		return <>Error</>;
	}

	try {
		return (
			<ReactMarkdown
				// DynamicReactMarkdown
				children={content}
				components={customRenderers}
				remarkPlugins={[remarkGfm]}
			/>
		);
	} catch (error) {
		setHasError(true);
	}
};

export default Md;
