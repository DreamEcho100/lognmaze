import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './PostDetails.module.css';

const PostDetails = ({ post }) => {
	const { content } = post;

	const customRenderers = {
		// img(image) {
		//   return (
		//     <Image
		//       src={`/images/posts/${post.slug}/${image.src}`}
		//       alt={image.alt}
		//       width={600}
		//       height={300}
		//     />
		//   );
		// },
		p({ children, node }) {
			if (node.children[0].tagName === 'img') {
				const image = node.children[0];
				let imgSrc;

				if (
					/^https:\/\//.test(image.properties.src) ||
					/^http:\/\//.test(image.properties.src)
				) {
					imgSrc = image.properties.src;
				} else {
					imgSrc = `/images/posts/${post.slug}/${image.properties.src}`;
				}

				return (
					<div className={classes.image}>
						<Image
							src={imgSrc}
							alt={image.alt}
							width={600}
							height={300}
							layout='responsive'
						/>
					</div>
				);
			}

			return <p>{children}</p>;
		},

		a({ href, children }) {
			if (href.startsWith('http://') || href.startsWith('https://')) {
				return (
					<Link href={href}>
						<a target='_blank' rel='noopener noreferrer'>
							{children}
						</a>
					</Link>
				);
			}

			return (
				<Link href={href}>
					<a>{children}</a>
				</Link>
			);
		},

		code({ node, inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || '');

			return !inline && match ? (
				<SyntaxHighlighter
					style={vscDarkPlus}
					language={match[1]}
					PreTag='div'
					children={String(children).replace(/\n$/, '')}
					{...props}
				/>
			) : (
				<code className={className} {...props} />
			);
		},
	};

	return (
		<section>
			<ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
		</section>
	);
};

export default PostDetails;
