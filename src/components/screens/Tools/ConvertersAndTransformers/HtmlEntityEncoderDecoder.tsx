import { useState } from 'react';
import FormField from '@components/shared/common/FormField';
import { htmlEntityEncoderDecoderTools } from '@utils/core/appData/tools/converters-and-transformers';
import FTRSection from '@components/screens/Tools/components/FormToResultSection';

// https://github.com/mathiasbynens/he

const HtmlEntityEncoderDecoderScreen = () => {
	const [toEncode, setToEncode] = useState('');
	const [toDecode, setToDecode] = useState('');

	return (
		<FTRSection.Container
			header={{ title: htmlEntityEncoderDecoderTools.shortTitle }}
			data={htmlEntityEncoderDecoderTools}
		>
			<FTRSection.Result>
				<FormField
					labelText='Enter text to encode:'
					isA='textarea'
					value={toEncode}
					name='toEncode'
					onChange={async (event) => {
						const value = event.target.value;
						await import('he')
							.then(({ default: He }) => {
								setToEncode(value);
								setToDecode(He.encode(value));
							})
							.catch((err) => console.error(err));
						// Add Error notification
					}}
				/>
			</FTRSection.Result>
			<FTRSection.Result>
				<FormField
					labelText='Enter text to decode:'
					isA='textarea'
					value={toDecode}
					name='toDecode'
					onChange={async (event) => {
						const value = event.target.value;
						await import('he')
							.then(({ default: He }) => {
								setToDecode(value);
								setToEncode(He.decode(value));
							})
							.catch((err) => console.error(err));
						// Add Error notification
					}}
				/>
			</FTRSection.Result>
		</FTRSection.Container>
	);
};

export default HtmlEntityEncoderDecoderScreen;
