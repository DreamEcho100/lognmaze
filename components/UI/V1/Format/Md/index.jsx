import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
// import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './index.module.css';

const Details = ({ content }) => {
	const customRenderers = {
		// img(image) {
		//   return (
		//     <Image
		//       src={`/images/News/${news.slug}/${image.src}`}
		//       alt={image.alt}
		//       width={600}
		//       height={300}
		//     />
		//   );
		// },
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
						{/* <Image
						src={imgSrc}
						alt={image.alt}
						width={600}
						height={300}
						layout='responsive'
					/> */}
						<img
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

		a({ href, children }) {
			if (href.startsWith('http://') || href.startsWith('https://')) {
				return (
					<a
						href={href}
						// target='_blank' rel='noopener noreferrer'
					>
						{children}
					</a>
				);
			}

			return (
				<Link href={href}>
					<a
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
		h1: ({ children, ...props }) => (
			<h1 id={`h1_${children[0].replace(/[^\w]/g, '-')}`}>{children}</h1>
		),
		h2: ({ children, ...props }) => (
			<h2 id={`h2_${children[0].replace(/[^\w]/g, '-')}`}>{children}</h2>
		),
		h3: ({ children, ...props }) => (
			<h3 id={`h3_${children[0].replace(/[^\w]/g, '-')}`}>{children}</h3>
		),
		h4: ({ children, ...props }) => (
			<h4 id={`h4_${children[0].replace(/[^\w]/g, '-')}`}>{children}</h4>
		),
		h5: ({ children, ...props }) => (
			<h5 id={`h5_${children[0].replace(/[^\w]/g, '-')}`}>{children}</h5>
		),
		h6: ({ children, ...props }) => (
			<h6 id={`h6_${children[0].replace(/[^\w]/g, '-')}`}>{children}</h6>
		),
	};

	return (
		<main className={classes['format-md']}>
			<ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
		</main>
	);
};

export default Details;
