/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Button from '@components/shared/common/Button';
import FormField from '@components/shared/common/FormField';
import { textToBarcodeTool } from '@utils/core/appData/tools/converters-and-transformers';
import FTRSection from '@components/screens/Tools/components/FormToResultSection';
import { useQuery } from '@tanstack/react-query';

import type { BaseOptions } from 'jsbarcode';
import type { JsBarcode } from '@utils/core/appData/tools/types';

// https://github.com/lindell/JsBarcode/wiki/Options#format
// https://www.npmjs.com/package/jsbarcode

const formatValues = [
	'CODE39',
	'CODE128',
	'CODE128A',
	'CODE128B',
	'CODE128C',
	'EAN13',
	'EAN8',
	'EAN5',
	'EAN2',
	'UPC',
	'ITF14',
	'ITF',
	'MSI',
	'MSI10',
	'MSI11',
	'MSI1010',
	'MSI1110',
	'pharmacode',
	'codabar'
];

const textAlignValues = ['left', 'center', 'right'];

const textPositionValues = ['bottom', 'top'];

const TextToBarcodeToolScreen = () => {
	const [text, setText] = useState('');
	const [formValues, setFormValues] = useState<BaseOptions>({
		background: '#ffffff',
		lineColor: '#000000',
		fontSize: undefined,
		format: formatValues[1],
		textAlign: textAlignValues[1],
		textPosition: textPositionValues[0],
		text: 'Loading...',
		displayValue: true
		// fontOptions: "bold italic"
	});

	const jsbarcodeQuery = useQuery<JsBarcode>(
		['jsbarcode'],
		async () =>
			await import('jsbarcode').then(({ default: JsBarcode }) => JsBarcode)
	);

	useEffect(() => {
		if (jsbarcodeQuery.isSuccess)
			setFormValues((prev) => ({ ...prev, text: '' }));
	}, [jsbarcodeQuery.isSuccess]);

	return (
		<FTRSection.Container
			header={{ title: 'Convert Text To Barcode' }}
			data={textToBarcodeTool}
		>
			<FTRSection.Form
				onSubmit={async (event) => {
					if (!jsbarcodeQuery.isSuccess) return;

					event.preventDefault();
					const filteredFormValues = Object.entries(formValues).filter(
						(item) => typeof item[1] !== 'undefined'
					);
					const options =
						filteredFormValues.length !== 0
							? Object.fromEntries(filteredFormValues)
							: undefined;

					jsbarcodeQuery.data('#barcode', text, options);
					// Add Error notification
				}}
			>
				<fieldset className='flex flex-wrap gap-2'>
					<legend>Color</legend>
					<FormField
						readOnly={jsbarcodeQuery.isLoading}
						labelVariants={{ w: 'fit' }}
						values={formValues}
						setValues={setFormValues}
						name='background'
						labelText='background'
						type='color'
					/>
					<FormField
						readOnly={jsbarcodeQuery.isLoading}
						labelVariants={{ w: 'fit' }}
						values={formValues}
						setValues={setFormValues}
						name='lineColor'
						labelText='line'
						type='color'
					/>
				</fieldset>
				<FormField
					isA='dropdown'
					values={formValues}
					setValues={setFormValues}
					labelText='format'
					name='format'
					options={formatValues.map((item) => ({
						children: item,
						value: item
					}))}
				/>
				<FormField
					readOnly={jsbarcodeQuery.isLoading}
					isA='textarea'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<Button type='submit' disabled={jsbarcodeQuery.isLoading}>
					Generate Barcode
				</Button>
			</FTRSection.Form>
			<FTRSection.Result className='overflow-auto'>
				<img id='barcode' alt='' className='min-h-[5rem]' />
			</FTRSection.Result>
		</FTRSection.Container>
	);
};

export default TextToBarcodeToolScreen;
