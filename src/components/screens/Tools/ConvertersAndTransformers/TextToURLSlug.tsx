import FormField from '@components/shared/common/FormField';
import { textToURLSlugConverterTool } from '@utils/core/appData/tools/converters-and-transformers';
import { useState } from 'react';
import slug from 'slug';
import ToolSEOTags from '@components/screens/Tools/components/ToolSEOTags';
import FAQs from '@components/screens/Tools/components/FAQs';
import { useQuery } from '@tanstack/react-query';

import type { Slug } from '@utils/core/appData/tools/types';

const TextToURLSlugConverterScreen = () => {
	const [inputText, setInputText] = useState('Text to URL Slug Converter');

	const slugQuery = useQuery<Slug>(
		['slug'],
		async () => await import('slug').then(({ default: Slug }) => Slug)
	);

	return (
		<>
			<ToolSEOTags data={textToURLSlugConverterTool} />
			<section className='section-p flex flex-col gap-4'>
				<header className='flex flex-col gap-2 text-center'>
					<h1 className='text-h1'>Text to URL Slug Converter</h1>
					<p>
						Enter some text in the input field below and click the
						&apos;Convert&apos; button to generate a URL slug.
					</p>
				</header>
				<div className='flex flex-col items-center gap-2 overflow-auto px-4'>
					<FormField
						type='text'
						value={inputText}
						onChange={(event) => setInputText(event.target.value)}
						labelProps={{ className: 'max-w-screen-md w-full' }}
						readOnly={slugQuery.isLoading}
					/>
					<p className='max-w-full'>
						{slugQuery.isLoading ? (
							'Loading...'
						) : slugQuery.isSuccess ? (
							<>
								Generated URL slug: <strong>{slugQuery.data(inputText)}</strong>{' '}
							</>
						) : null}
					</p>
				</div>
				<FAQs faqs={textToURLSlugConverterTool.faqs} />
			</section>
		</>
	);
};

export default TextToURLSlugConverterScreen;
