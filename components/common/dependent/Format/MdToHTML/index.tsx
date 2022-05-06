import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Options } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';

const SyntaxHighlighterDynamic = dynamic(() => import('./SyntaxHighlighter'));

import helpersClasses from '@styles/helpers.module.css';

import { imagesWeservNlLoader } from '@commonLibIndependent/image';

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
					src={imagesWeservNlLoader({
						url: image.src,
						w: 800,
					})}
					alt={image.alt}
				/>
			);
		},

		a({ href, children }) {
			if (!href) return <></>;

			if (href.startsWith('/') || href.startsWith('https://lognmaze.com')) {
				return (
					<Link href={href} prefetch={false}>
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

		code({ inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || '');

			const { style, ...withNoStyles } = props;

			return !inline && match ? (
				<SyntaxHighlighterDynamic
					language={match[1]}
					PreTag='div'
					{...withNoStyles}
				>
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
			<ReactMarkdown components={customComponents} remarkPlugins={[remarkGfm]}>
				{content}
			</ReactMarkdown>
		</>
	);
};

export default MdToHTMLFormatter;
