import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	// atomDark,
	// vsDark,
	vscDarkPlus,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './Post.module.css';

const Post = ({ post }) => {
	const {
		id,
		author_id,
		format_type,
		title,
		meta_title,
		slug,
		image,
		tags,
		meta_description,
		excerpt,
		content,
		like_user_id,
		likes,
		created_at,
		updated_on,
	} = post;

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
			// href.startsWith('http://');
			// href.startsWith('https://');
			// /^http:\/\//.test(href);
			// /^https:\/\//.test(href);

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

	console.log('id', id);
	console.log('author_id', author_id);
	console.log('format_type', format_type);
	console.log('title', title);
	console.log('meta_title', meta_title);
	console.log('slug', slug);
	console.log('image', image);
	console.log('tags', tags);
	console.log('meta_description', meta_description);
	console.log('excerpt', excerpt);
	console.log('content', content);
	console.log('like_user_id', like_user_id);
	console.log('likes', likes);
	console.log('created_at', created_at);
	console.log('updated_on', updated_on);

	return (
		<article>
			<ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
		</article>
	);
};

export default Post;
