import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head />
				<body>
					{/* <!-- Yandex.Metrika counter --> */}
					<noscript>
						<div>
							<img
								src='https://mc.yandex.ru/watch/85004128'
								style={{ position: 'absolute', left: '-9999px' }}
								alt=''
							/>
						</div>
					</noscript>
					{/* <!-- End Yandex.Metrika counter --> */}

					{/* <!-- Google Tag Manager (noscript) --> */}
					<noscript>
						<iframe
							src='https://www.googletagmanager.com/ns.html?id=GTM-N45HP9S'
							height='0'
							width='0'
							style={{ display: 'none', visibility: 'hidden' }}
						></iframe>
					</noscript>
					{/* <!-- End Google Tag Manager (noscript) --> */}
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
