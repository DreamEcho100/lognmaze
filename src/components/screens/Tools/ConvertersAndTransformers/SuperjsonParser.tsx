import { useEffect, useState } from 'react';
import FormField from '@components/shared/common/FormField';
import { superjsonParserTools } from '@utils/core/appData/tools/converters-and-transformers';
import FTRSection from '@components/screens/Tools/components/FormToResultSection';
import { useQuery } from '@tanstack/react-query';
import type SuperJSON from 'superjson';

const SuperjsonParserScreen = () => {
	const [toParse, setToParse] = useState('Loading...');
	const [toStringify, setToStringify] = useState('{"json":"Loading..."}');

	const superjsonQuery = useQuery<typeof SuperJSON>(
		['superjson'],
		async () =>
			await import('superjson').then(({ default: JsBarcode }) => JsBarcode)
	);

	useEffect(() => {
		if (superjsonQuery.isSuccess) {
			setToParse('');
			setToStringify('');
		}
	}, [superjsonQuery.isSuccess]);

	return (
		<FTRSection.Container
			header={{ title: superjsonParserTools.shortTitle }}
			data={superjsonParserTools}
		>
			<FTRSection.Result>
				<FormField
					labelText='Enter text to parse:'
					isA='textarea'
					value={toParse}
					name='toParse'
					readOnly={superjsonQuery.isLoading}
					onChange={async (event) => {
						if (!superjsonQuery.isSuccess) return;

						const value = event.target.value;
						setToParse(value);

						try {
							setToStringify(superjsonQuery.data.stringify(value));
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
					labelText='Enter text to stringify:'
					isA='textarea'
					value={toStringify}
					name='toStringify'
					readOnly={superjsonQuery.isLoading}
					onChange={async (event) => {
						if (!superjsonQuery.isSuccess) return;

						const value = event.target.value;
						setToStringify(value);

						try {
							setToParse(superjsonQuery.data.parse(value));
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

export default SuperjsonParserScreen;
