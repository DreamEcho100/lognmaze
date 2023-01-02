/* eslint-disable @next/next/no-img-element */
import type { FormEvent } from 'react';

import { useState } from 'react';
import QRCode from 'qrcode'; // or you can use QRcode.js
import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import { textToQRCodeConverterTool } from '@utils/core/appData/tools';
import FormField from '@components/shared/common/FormField';
import Button from '@components/shared/common/Button';

const TextToQRCodeConverter = () => {
	const [text, setText] = useState('');
	const [qrCodeUrl, setQrCodeUrl] = useState('');

	const generateQRCode = (event: FormEvent) => {
		event.preventDefault();
		QRCode.toDataURL(text)
			.then((url) => setQrCodeUrl(url))
			.catch((err) => console.error(err));
	};

	return (
		<>
			<CustomNextSeo
				pageTitle={textToQRCodeConverterTool.title}
				pageDescription={textToQRCodeConverterTool.description}
			/>
			<section className='section-p flex flex-col gap-4'>
				<header className='text-center'>
					<h1 className='text-h1'>Text to QR Code Converter</h1>
				</header>
				<div className='flex flex-col gap-4 md:flex-row'>
					<form onSubmit={generateQRCode} className='w-full md:w-1/2'>
						<fieldset className='flex flex-col gap-4'>
							<FormField
								labelText='Enter text:'
								isA='textarea'
								value={text}
								onChange={(event) => setText(event.target.value)}
							/>
							<Button type='submit'>Generate QR Code</Button>
						</fieldset>
					</form>
					<div className='w-full md:w-1/2'>
						<div className='h-64 w-64'>
							{qrCodeUrl && (
								<img
									src={qrCodeUrl}
									alt='QR Code'
									width={250}
									height={250}
									className='h-full w-full'
								/>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default TextToQRCodeConverter;
