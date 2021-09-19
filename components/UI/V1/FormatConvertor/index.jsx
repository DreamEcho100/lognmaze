import { useState } from 'react';
import dynamic from 'next/dynamic';

import classes from './index.module.css';

import FormatterContainer from '@components/UI/V1/Format/Container';
import Textarea from '@components/UI/V1/Textarea';

const DynamicMd = dynamic(() => import('@components/UI/V1/Format/Md'));

const FormatConvertor = ({
	fromFormatType = 'txt',
	toFormatType = 'md',
	name = 'content',
	id = content,
	...props
}) => {
	const [values, setValues] = useState({ content: '' });

	return (
		<main className={classes.main}>
			<section>
				<Textarea
					value={props.values[name] || values[name]}
					setValues={props.setValues || setValues}
					name={name}
					id={id}
					style={{
						height: '100%',
						minHeight: '100%',
					}}
				></Textarea>
			</section>
			<section>
				{fromFormatType === 'txt' && toFormatType === 'md' && (
					<FormatterContainer>
						<DynamicMd content={props.values[name] || values[name]} />
					</FormatterContainer>
				)}
			</section>
		</main>
	);
};

export default FormatConvertor;
