import { FC } from 'react';
import Head from 'next/head';

interface IProps {
	errMsg: string;
}

const PageErrorMessage: FC<IProps> = ({ errMsg }) => {
	return (
		<>
			<Head>
				{/* <meta name='robots' content='noindex,nofollow' /> */}
				<meta name='robots' content='noindex' />
				<title>{errMsg}</title>
			</Head>
			<p>{errMsg}</p>
		</>
	);
};

export default PageErrorMessage;
