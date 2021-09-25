import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link
						rel='preconnect'
						// rel='preload'
						href='https://fonts.googleapis.com'
					/>
					<link
						rel='preconnect'
						// rel='preload'
						href='https://fonts.gstatic.com'
						// crossorigin
						crossOrigin='true'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap'
						rel='stylesheet'
						// rel='preload'
					/>
					<script
						data-ad-client='ca-pub-8030984398568253'
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
					></script>
				</Head>
				<body>
					<Main />
					<NextScript />
					<script defer rel='preload' src='/script.js' />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
