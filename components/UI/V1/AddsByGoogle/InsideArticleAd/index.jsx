// import { useEffect } from 'react';
// import AdSense from 'react-adsense';
// import AdSense from 'react-adsense-ad';
import AddsByGoogle from '@components/UI/V1/AddsByGoogle';

const InsideBlogAd = () => {
	// useEffect(() => {
	// 	try {
	// 		(window.adsbygoogle = window.adsbygoogle || []).push({});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }, []);

	return (
		<section
			style={{
				width: '100%',
				overflowY: 'hidden',
				overflowX: 'auto',
			}}
		>
			<AddsByGoogle
				// client='ca-pub-7292810486004926'
				// slot='7806394673'
				// style={{ display: 'block' }}
				// layout='in-blog'
				// format='fluid'

				className='adsbygoogle InsideBlogAd'
				client='ca-pub-8030984398568253'
				slot='8883547056'
				style={{
					display: 'block',
					// minHeight: 'min(25vh, 10rem)',
					width: '100%',
					textAlign: 'center',
					minWidth: '251px',
				}}
				layout='in-blog'
				format='fluid'
			/>
		</section>
	);

	/*
	return (
		<ins
			className='adsbygoogle PhotoAdd1'
			data-ad-client='ca-pub-8030984398568253'
			data-ad-slot='8883547056'
			style={{
				display: 'block',
				// minHeight: 'min(25vh, 10rem)',
				width: '100%',
				textAlign: 'center',
			}}
			data-ad-layout='in-blog'
			data-ad-format='fluid'
		/>
	);
	*/

	/*
	return (
		<>
			<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8030984398568253"
     crossorigin="anonymous"></script>
			<ins class="adsbygoogle"
					style="display:block; text-align:center;"
					data-ad-layout="in-blog"
					data-ad-format="fluid"
					data-ad-client="ca-pub-8030984398568253"
					data-ad-slot="8883547056"
				></ins>
			<script>
					(adsbygoogle = window.adsbygoogle || []).push({});
			</script>
		</>
	);
  */
};

export default InsideBlogAd;
