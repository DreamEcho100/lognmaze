import { useState } from 'react';
import FormField from '@components/shared/common/FormField';
import { morseCodeConverterTool } from '@utils/core/appData/tools/converters-and-transformers';
import FTRSection from '@components/screens/Tools/components/FormToResultSection';
import { useQuery } from '@tanstack/react-query';

import { type MorseConverter } from '@utils/core/appData/tools/types';

// https://github.com/JaimermXD/morse-converter/blob/master/docs/index.md

const MorseCodeConverterToolScreen = () => {
	const [toEncode, setToEncode] = useState('Hello world!');
	const [toDecode, setToDecode] = useState(
		'.... . .-.. .-.. --- / .-- --- .-. .-.. -.. -.-.--'
	);

	const morseConverterQuery = useQuery<MorseConverter>(
		['morse-converter'],
		async () => await import('morse-converter').then(({ default: MorseConverter }) => MorseConverter)
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
						readOnly={morseConverterQuery.isLoading}
						onChange={async (event) => {
							if (!morseConverterQuery.isSuccess) return;

							const value = event.target.value;
							setToEncode(value);

							try {
								setToDecode(morseConverterQuery.data.encode(value));
							} catch (err) {
								err instanceof Error
									? console.error(err.message)
									: console.error(err);
							}
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
							if (!morseConverterQuery.isSuccess) return;

							const value = event.target.value;
							setToDecode(value);

							try {
								setToEncode(morseConverterQuery.data.decode(value));
							} catch (err) {
								err instanceof Error
									? console.error(err.message)
									: console.error(err);
							}
							// Add Error notification
						}}
					/>
				</FTRSection.Result>
			</FTRSection.Container>
		</>
	);
};

export default MorseCodeConverterToolScreen;
