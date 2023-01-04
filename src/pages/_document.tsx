import Script from 'next/script';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<Script
						strategy='beforeInteractive'
						id='google-ad-sense-id'
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8030984398568253'
						crossOrigin='anonymous'
						data-ad-client='ca-pub-8030984398568253'
						onError={(err) => console.error('Script failed to load', err)}
					></Script>
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
