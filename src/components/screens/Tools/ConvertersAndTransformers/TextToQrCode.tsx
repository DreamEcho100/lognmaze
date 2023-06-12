/* eslint-disable @next/next/no-img-element */
import type { FormEvent } from 'react';

import { useState } from 'react';
import FormField from '@components/shared/common/FormField';
import Button from '@components/shared/common/Button';
import { textToQRCodeConverterTool } from '@utils/core/appData/tools/converters-and-transformers';
import FTRSection from '@components/screens/Tools/components/FormToResultSection';
import { useQuery } from '@tanstack/react-query';
import type { QRCode } from '@utils/core/appData/tools/types';

const TextToQRCodeConverterScreen = () => {
	const [text, setText] = useState('');
	const [qrCodeUrl, setQrCodeUrl] = useState('');

	const qrCodeQuery = useQuery<QRCode>(
		['qrcode'],
		async () => await import('qrcode').then(({ default: QRCode }) => QRCode)
	);

	const generateQRCode = async (event: FormEvent) => {
		event.preventDefault();

		if (!qrCodeQuery.isSuccess) return;

		try {
			qrCodeQuery.data.toDataURL(text).then((url) => setQrCodeUrl(url));
		} catch (err) {
			console.error(err);
		}
		// Add Error notification
	};

	return (
		<FTRSection.Container
			header={{ title: 'Text to QR Code Converter' }}
			data={textToQRCodeConverterTool}
		>
			<FTRSection.Form onSubmit={generateQRCode}>
				<FormField
					labelText='Enter text:'
					isA='textarea'
					value={text}
					onChange={(event) => setText(event.target.value)}
					readOnly={qrCodeQuery.isLoading}
				/>
				<Button type='submit' disabled={qrCodeQuery.isLoading}>
					Generate QR Code
				</Button>
			</FTRSection.Form>
			<FTRSection.Result>
				{qrCodeUrl && (
					<img
						src={qrCodeUrl}
						alt='QR Code'
						width={250}
						height={250}
						className='h-full w-full'
					/>
				)}
			</FTRSection.Result>
		</FTRSection.Container>
	);
};

export default TextToQRCodeConverterScreen;
