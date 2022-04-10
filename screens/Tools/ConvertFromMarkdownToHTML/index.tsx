import { useState } from 'react';
import { NextSeo } from 'next-seo';

import classes from './index.module.css';
import helperClasses from '@styles/helpers.module.css';
import borderClasses from '@styles/border.module.css';

import MdToHTMLFormatter from '@commonComponentsDependent/Format/MdToHTML';
import TextareaComponent from '@commonComponentsIndependent/Textarea';
// import extraAppLinksArr from '@data/appLinks';

const ConvertFromMarkdownToHTMLAppScreen = () => {
	const [values, setValues] = useState({
		mdContent:
			'# Convert from Markdown**(md)** to Hyper Text Markup Language**(HTML)**\n\nPaste or type your markdown and see it rendered as HTML. Then copy the resulting HTML.\n',
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
							alt: 'LogNMaze Logo',
						},
					],
				}}
			/>
			<main className={helperClasses.main}>
				<header className={classes.convertorHeader}>
					<h1>
						Convert from Markdown<strong>(md)</strong> to Hyper Text Markup
						Language
						<strong>(HTML)</strong>
					</h1>
					Paste or type your markdown and see it rendered as HTML. Then copy the
					resulting HTML.
				</header>
				<section className={classes.convertorContainer}>
					<div className={classes.mdTextareaSection}>
						<header>
							<h2>
								<label htmlFor='mdTextarea'>Type Markdown here</label>
							</h2>
						</header>
						<div
							className={`${classes.mdTextareaContainer} ${borderClasses.default}`}
						>
							<TextareaComponent
								setValues={setValues}
								name='mdContent'
								value={values.mdContent}
								className={classes.mdTextarea}
								id='mdTextarea'
							/>
						</div>
					</div>
					<div className={classes.htmlResultSection}>
						<header>
							<h2>And HTML will show here</h2>
						</header>
						<div className={classes.htmlResultContainer}>
							<MdToHTMLFormatter content={values.mdContent} />
						</div>
					</div>
				</section>
				<footer className={classes.convertorFooter}>
					<h2>Coming Soon:</h2>
					<ul>
						{[
							'The ability to add styles to the HTML result!',
							'The ability to save stylesheets to use with your conversion in your localStorage!',
							'Show Raw HTML!',
						].map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</footer>
			</main>
		</>
	);
};

export default ConvertFromMarkdownToHTMLAppScreen;
