import FormField from '@components/shared/common/FormField';
import { textToURLSlugConverterTool } from '@utils/core/appData/tools/converters-and-transformers';
import { useState } from 'react';
import slug from 'slug';
import ToolSEOTags from '@components/screens/Tools/components/ToolSEOTags';

const TextToURLSlugConverterScreen = () => {
	const [inputText, setInputText] = useState('Text to URL Slug Converter');

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
					/>
					<p className='max-w-full'>
						Generated URL slug: <strong>{slug(inputText)}</strong>
					</p>
				</div>
			</section>
		</>
	);
};

export default TextToURLSlugConverterScreen;
