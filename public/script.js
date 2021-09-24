document.addEventListener('DOMContentLoaded', () => {
	/*
	const noscriptElement = document.createElement('noscript');
	noscriptElement.innerHTML = `
		<div>
			<img
				src='https://mc.yandex.ru/watch/85004128'
				style=" position: 'absolute';left: '-9999px';"
				alt=''
			/>
		</div>
	`;

	const noscriptElement2 = document.createElement('noscript');
	noscriptElement.innerHTML = `
		<iframe
			src='https://www.googletagmanager.com/ns.html?id=GTM-N45HP9S'
			height='0'
			width='0'
			style=" display: 'none';visibility: 'hidden';"
			loading="lazy"
		></iframe>
	`;

	document.body.append(noscriptElement);
	document.body.append(noscriptElement2);

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
	*/

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
});
