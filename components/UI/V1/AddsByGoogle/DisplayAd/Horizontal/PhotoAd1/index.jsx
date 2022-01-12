// import { useEffect } from 'react';
// import AdSense from 'react-adsense';
// import AdSense from 'react-adsense-ad';
import AddsByGoogle from '@components/UI/V1/AddsByGoogle';

const HorizontalPhotoAd1 = () => {
	// useEffect(() => {
	// 	try {
	// 		(window.adsbygoogle = window.adsbygoogle || []).push({});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }, []);

	return (
		<AddsByGoogle
			// client='ca-pub-7292810486004926'
			// slot='7806394673'
			// style={{ display: 'block' }}
			// layout='in-blog'
			// format='fluid'

			className='adsbygoogle PhotoAdd1'
			client='ca-pub-8030984398568253'
			slot='7838042788'
			style={{
				display: 'block',
				// height: 'min(25vh, 10rem)',
				width: '100%',
			}}
			format='auto'
			responsive
		/>
	);

	/*
	return (
		<ins
			className='adsbygoogle PhotoAdd1'
			style={{
				display: 'block',
				// height: 'min(25vh, 10rem)',
				width: '100%',
			}}
			data-ad-client='ca-pub-8030984398568253'
			data-ad-slot='7838042788'
			data-ad-format='auto'
			data-full-width-responsive='true'
		/>
	);
	*/

	/*
	return (
		<>
			<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8030984398568253" crossorigin="anonymous"></script>
				<!-- PhotoAd1 -->
				<ins class="adsbygoogle"
					style="display:block"
					data-ad-client="ca-pub-8030984398568253"
					data-ad-slot="7838042788"
					data-ad-format="auto"
					data-full-width-responsive="true"
				></ins>
			<script>
					(adsbygoogle = window.adsbygoogle || []).push({});
			</script>
		</>
	);
  */
};

export default HorizontalPhotoAd1;
