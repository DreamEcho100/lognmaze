import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Options } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';

const SyntaxHighlighterDynamic = dynamic(() => import('./SyntaxHighlighter'));

// import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

interface Props {
	content: string;
}

type TCustomComponents = Options['components'];

const MdToHTMLFormatter: FC<Props> = ({ content }) => {
	const customComponents: TCustomComponents = {
		img(image) {
			if (!image.src || !image.alt) return <></>;

			return (
				<CustomNextImage
					// <div className={classes['img-container']}>
					src={image.src}
					alt={image.alt}
					// style={{
					// 	position: 'relative',
					// 	width: '100%',
					// 	height: 'revert',
					// 	minWidth: 'revert',
					// 	maxWidth: 'revert',
					// 	minHeight: 'revert',
					// 	maxHeight: 'revert',
					// }}
					// </div>
				/>
			);
		},

		a({ href, children, node }) {
			if (!href) return <></>;

			if (href.startsWith('/') || href.startsWith('https://lognmaze.com')) {
				return (
					<Link href={href} prefetch={false} passHref>
						<a className={helpersClasses.textGlowSpecial}>{children}</a>
					</Link>
				);
			}

			return (
				<a
					className={helpersClasses.textGlowSpecial}
					href={href}
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
	};

	return (
		<>
			<ReactMarkdown
				// DynamicReactMarkdown
				components={customComponents}
				remarkPlugins={[remarkGfm]}
			>
				{content}
			</ReactMarkdown>
			{/* {addHorizontalPhotoAd11 ? <DynamicHorizontalPhotoAd1 /> : ''} */}
		</>
	);
};

export default MdToHTMLFormatter;
