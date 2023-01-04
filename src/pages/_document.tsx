import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link
						as='script'
						rel='preload'
						href='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8030984398568253'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
