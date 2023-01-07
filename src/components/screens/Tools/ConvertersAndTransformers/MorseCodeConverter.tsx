import { useState } from 'react';
import FormField from '@components/shared/common/FormField';
import { morseCodeConverterTool } from '@utils/core/appData/tools/converters-and-transformers';
import FTRSection from '@components/screens/Tools/components/FormToResultSection';

// https://github.com/JaimermXD/morse-converter/blob/master/docs/index.md

const MorseCodeConverterToolScreen = () => {
	const [toEncode, setToEncode] = useState('Hello world!');
	const [toDecode, setToDecode] = useState(
		'.... . .-.. .-.. --- / .-- --- .-. .-.. -.. -.-.--'
	);

	return (
		<>
			<FTRSection.Container
				header={{ title: morseCodeConverterTool.shortTitle }}
				data={morseCodeConverterTool}
			>
				<FTRSection.Result>
					<FormField
						labelText='Enter text to encode:'
						isA='textarea'
						value={toEncode}
						name='toEncode'
						onChange={async (event) => {
							const value = event.target.value;
							await import('morse-converter')
								.then(({ encode }) => {
									setToEncode(value);
									setToDecode(encode(value, {}));
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
							await import('morse-converter')
								.then(({ decode }) => {
									setToDecode(value);
									setToEncode(decode(value));
								})
								.catch((err) => console.error(err));
							// Add Error notification
						}}
					/>
				</FTRSection.Result>
			</FTRSection.Container>
		</>
	);
};

export default MorseCodeConverterToolScreen;
