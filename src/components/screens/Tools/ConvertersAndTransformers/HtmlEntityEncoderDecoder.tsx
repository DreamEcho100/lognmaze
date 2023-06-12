import { useState } from 'react';
import FormField from '@components/shared/common/FormField';
import { htmlEntityEncoderDecoderTools } from '@utils/core/appData/tools/converters-and-transformers';
import FTRSection from '@components/screens/Tools/components/FormToResultSection';
import { useQuery } from '@tanstack/react-query';

import type { HTMLEntity } from '@utils/core/appData/tools/types';

// https://github.com/mathiasbynens/he

const HtmlEntityEncoderDecoderScreen = () => {
	const [toEncode, setToEncode] = useState('');
	const [toDecode, setToDecode] = useState('');

	const heQuery = useQuery<HTMLEntity>(
		['he'],
		async () => await import('he').then(({ default: He }) => He)
	);

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
					readOnly={heQuery.isLoading}
					onChange={async (event) => {
						if (!heQuery.isSuccess) return;

						const value = event.target.value;
						setToEncode(value);

						try {
							setToDecode(heQuery.data.encode(value));
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
					readOnly={heQuery.isLoading}
					onChange={async (event) => {
						if (!heQuery.isSuccess) return;

						const value = event.target.value;
						setToDecode(value);

						try {
							setToEncode(heQuery.data.decode(value));
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
	);
};

export default HtmlEntityEncoderDecoderScreen;
