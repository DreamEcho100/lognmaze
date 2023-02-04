import type { FC, ReactNode } from 'react';
import type { Options } from 'react-markdown/lib/ast-to-react';

import { useEffect, useState, useRef, isValidElement, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GoogleAdSenseHResponsiveImageV1 = dynamic(
	() => import('@components/shared/common/GoogleAdSense/HResponsiveImageV1')
);
const SyntaxHighlighterDynamic = dynamic(() => import('./SyntaxHighlighter'));

import CustomNextImage from '../../CustomNextImage';
import { cx } from 'class-variance-authority';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { BiCopy } from 'react-icons/bi';

interface Props {
	content: string;
}

type TCustomComponents = Options['components'];

function CodeCopyBtn({ children }: { children: ReactNode | ReactNode[] }) {
	const [copyOk, setCopyOk] = useState(false);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (copyOk) timeoutId = setTimeout(() => setCopyOk(false), 1000);

		return () => timeoutId && clearTimeout(timeoutId);
	}, [copyOk]);

	return (
		<button
			className={cx(
				'absolute right-2 top-2 text-2xl text-white',
				copyOk ? 'text-green-600' : ' text-gray-600 hover:text-gray-500'
			)}
			onClick={() => {
				const child = !children
					? undefined
					: Array.isArray(children)
					? children[0]
					: children
					? children
					: undefined;
				if (!child || !isValidElement(child) || copyOk) return;

				navigator.clipboard.writeText(child.props.children[0]);

				setCopyOk(true);
			}}
			disabled={copyOk}
			title={copyOk ? 'copied' : 'click to copy'}
		>
			{copyOk ? <BsFillBookmarkCheckFill /> : <BiCopy />}
		</button>
	);
}

const MdToHTMLFormatter: FC<Props> = ({ content }) => {
	const configRef = useRef({
		counters: {
			h2: 0
		}
	});
	const customComponents: TCustomComponents = {
		pre({ children }) {
			return (
				<pre className='relative'>
					<CodeCopyBtn>{children}</CodeCopyBtn>
					{children}
				</pre>
			);
		},
		img(image) {
			if (!image.src || !image.alt) return <></>;

			return (
				<CustomNextImage
					src={image.src}
					width={1024}
					height={800}
					alt={image.alt}
				/>
			);
		},

		a({ href, children }) {
			if (!href) return <></>;

			if (href.startsWith('/') || href.startsWith('https://lognmaze.com')) {
				return (
					<Link
						href={href}
						prefetch={false}
						// className={helpersClasses.textGlowSpecial}
					>
						{children}
					</Link>
				);
			}

			return (
				<a
					// className={helpersClasses.textGlowSpecial}
					href={href}
					target='_blank'
					rel='noopener noreferrer'
				>
					{children}
				</a>
			);
		},

		code({ inline, className, children, node, ...props }) {
			const match = /language-(\w+)/.exec(className || '');

			if (typeof children === 'string') return <></>;

			const { style, ...withNoStyles } = props;

			return !inline && match ? (
				<Suspense
					fallback={
						<pre>
							<code>{JSON.stringify(children, null, 2)}</code>
						</pre>
					}
				>
					<SyntaxHighlighterDynamic
						language={match[1]}
						PreTag='div'
						codeTagProps={{
							style: { margin: '0 !important' },
							className: 'py-4'
						}}
						lineProps={{
							style: { margin: '0 !important' }
						}}
						{...withNoStyles}
					>
						{String(children).replace(/\n$/, '')}
					</SyntaxHighlighterDynamic>
				</Suspense>
			) : (
				<code
					className={cx(
						className,
						'p-1',
						'color-theme-primary-600 bg-opacity-90',
						'hover:bg-opacity-100 hover:transition-all hover:duration-150'
					)}
					{...props}
					data-code-inline='true'
				>
					{JSON.stringify(children, null, 2)}
				</code>
			);
		},
		h2: ({ children, level, node, ...props }) => {
			configRef.current.counters.h2++;

			if (configRef.current.counters.h2 % 2 === 0)
				return (
					<>
						<GoogleAdSenseHResponsiveImageV1 />
						<h2 {...props}>{children}</h2>
					</>
				);

			return <h2 {...props}>{children}</h2>;
		}
	};

	return (
		<>
			<ReactMarkdown
				components={customComponents}
				remarkPlugins={[remarkGfm as any]}
			>
				{content}
			</ReactMarkdown>
		</>
	);
};

export default MdToHTMLFormatter;
