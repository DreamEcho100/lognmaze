import { useEffect, useRef, useState } from 'react';
import { NextSeo } from 'next-seo';

import MdToHTMLFormatter from '@components/shared/common/Format/MdToHTML';
import FormField from '@components/shared/common/FormField';
import { Tab } from '@headlessui/react';
import { handleButtonVariants } from '@components/shared/common/Button';

// import MdToHTMLFormatter from '@commonComponentsDependent/Format/MdToHTML';
// import TextareaComponent from '@commonComponentsIndependent/Textarea';
// import extraAppLinksArr from '@data/appLinks';

const ConvertFromMarkdownToHTMLAppScreen = () => {
	const [values, setValues] = useState({
		mdContent:
			'# Convert from Markdown **(md)** to Hyper Text Markup Language **(HTML)**\n\nPaste or type your markdown and see it rendered as HTML. Then copy the resulting HTML.\n'
	});

	return (
		<>
			<NextSeo
				title='Free Markdown to HTML Converter | LogNMaze'
				description='Convert your markdown to HTML in one easy steps - for free! | LogNMaze'
				canonical='https://lognmaze.com/tools/convert_from_markdown_to_html'
				openGraph={{
					title: 'Free Markdown to HTML Converter | LogNMaze',
					description:
						'Convert your markdown to HTML in one easy steps - for free! | LogNMaze',
					images: [
						{
							url: 'https://lognmaze.com/favicon.ico',
							width: 250,
							height: 250,
							alt: 'LogNMaze Logo'
						}
					]
				}}
			/>
			<section className='section-p flex flex-col gap-4'>
				<header className='flex flex-col gap-2 text-center'>
					<h1 className='text-h1'>
						Convert from Markdown <strong>(md)</strong> to Hyper Text Markup
						Language <strong>(HTML)</strong>
					</h1>
					Paste or type your markdown and see it rendered as HTML. Then copy the
					resulting HTML.
				</header>
				<div className='flex flex-col gap-4 md:flex-row'>
					<div className='flex flex-col gap-2 md:w-1/2'>
						<header className='text-center md:min-h-[10rem]'>
							<h2 className='text-h2'>
								<label htmlFor='mdTextarea' className='cursor-pointer'>
									Type Markdown here
								</label>
							</h2>
						</header>
						<div>
							<FormField
								isA='textarea'
								setValues={setValues}
								name='mdContent'
								values={values}
								labelProps={{ className: 'w-full' }}
								id='mdTextarea'
							/>
						</div>
					</div>
					<div className='flex flex-col gap-2 md:w-1/2'>
						<HTMLPart content={values.mdContent} />
					</div>
				</div>
				<footer>
					<h2 className='text-h2'>Coming Soon:</h2>
					<ul>
						{[
							'The ability to add styles to the HTML result!',
							'The ability to save stylesheets to use with your conversion in your localStorage!'
						].map((item) => (
							<li key={item.replace(/[\W]+/g, '-')}>{item}</li>
						))}
					</ul>
				</footer>
			</section>
		</>
	);
};

export default ConvertFromMarkdownToHTMLAppScreen;

const HTMLPart = ({ content }: { content: string }) => {
	const [isHidden, setIsHidden] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const prevContentRef = useRef('');
	const tabPanelMdToHTMLFormatterRef = useRef<HTMLDivElement>(null);
	const [contentAsHTML, setContentAsHTML] = useState(
		tabPanelMdToHTMLFormatterRef.current?.innerHTML || ''
	);

	const viewTabIndex = 1;

	useEffect(() => {
		if (!isHidden && content !== prevContentRef.current) {
			prevContentRef.current = content;
			setContentAsHTML(tabPanelMdToHTMLFormatterRef.current?.innerHTML || '');
		}
	}, [content, isHidden]);

	useEffect(() => setIsHidden(false), []);

	if (isHidden) return <></>;

	return (
		<>
			<Tab.Group
				selectedIndex={selectedIndex}
				onChange={(index) => setSelectedIndex(index)}
			>
				<header className='flex flex-col gap-2 md:min-h-[10rem]'>
					<h2 className='text-center text-h2'>And HTML will show here</h2>
					<Tab.List className='flex flex-wrap items-center justify-center gap-2'>
						<Tab className={handleButtonVariants({ p: 'sm' })}>HTML</Tab>
						<Tab className={handleButtonVariants({ p: 'sm' })}>View</Tab>
					</Tab.List>
				</header>
				<Tab.Panels className='h-full min-h-[15rem]'>
					<Tab.Panel className='prose h-full prose-code:h-full prose-pre:h-full'>
						<MdToHTMLFormatter
							content={`\`\`\`html
${contentAsHTML}
\`\`\``}
						/>
					</Tab.Panel>
					<Tab.Panel className='h-full'>
						{selectedIndex === viewTabIndex && (
							<div
								ref={tabPanelMdToHTMLFormatterRef}
								className='h-full overflow-auto'
							>
								<MdToHTMLFormatter content={content} />
							</div>
						)}
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
			{selectedIndex !== viewTabIndex && (
				<div
					ref={tabPanelMdToHTMLFormatterRef}
					className='pointer-events-none h-1 opacity-0'
				>
					<MdToHTMLFormatter content={content} />
				</div>
			)}
		</>
	);
};
