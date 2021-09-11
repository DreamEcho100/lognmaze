import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					{'<!-- Yandex.Metrika counter -->'}
					<script
						type='text/javascript'
						dangerouslySetInnerHTML={{
							__html: `
							(function (m, e, t, r, i, k, a) {
								m[i] =
									m[i] ||
									function () {
										(m[i].a = m[i].a || []).push(arguments);
									};
								m[i].l = 1 * new Date();
								(k = e.createElement(t)),
									(a = e.getElementsByTagName(t)[0]),
									(k.async = 1),
									(k.src = r),
									a.parentNode.insertBefore(k, a);
							})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
					
							ym(85004128, 'init', {
								clickmap: true,
								trackLinks: true,
								accurateTrackBounce: true,
								webvisor: true,
							});
						`,
						}}
					></script>

					{'<!-- Clarity tracking code for https://lognmaze.com/ -->'}
					<script
						dangerouslySetInnerHTML={{
							__html: `
							(function (c, l, a, r, i, t, y) {
								c[a] =
									c[a] ||
									function () {
										(c[a].q = c[a].q || []).push(arguments);
									};
								t = l.createElement(r);
								t.async = 1;
								t.src = 'https://www.clarity.ms/tag/' + i + '?ref=bwt';
								y = l.getElementsByTagName(r)[0];
								y.parentNode.insertBefore(t, y);
							})(window, document, 'clarity', 'script', '8co4gbipfa');
						`,
						}}
					/>

					{'<!-- Google Tag Manager -->'}
					<script
						dangerouslySetInnerHTML={{
							__html: `
							(function (w, d, s, l, i) {
								w[l] = w[l] || [];
								w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
								var f = d.getElementsByTagName(s)[0],
									j = d.createElement(s),
									dl = l != 'dataLayer' ? '&l=' + l : '';
								j.async = true;
								j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
								f.parentNode.insertBefore(j, f);
							})(window, document, 'script', 'dataLayer', 'GTM-N45HP9S');
						`,
						}}
					/>
					{'<!-- End Google Tag Manager -->'}

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
				</Head>
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
