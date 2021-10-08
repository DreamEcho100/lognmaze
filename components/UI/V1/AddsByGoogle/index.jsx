import { useEffect } from 'react';
// import PropTypes from 'prop-types';

const AddsByGoogle = ({
	client,
	slot,
	className = '',
	style = { display: 'block' },
	format = 'auto',
	layout = '',
	responsive = 'false',
	...props
}) => {
	useEffect(() => {
		if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
	}, []);

	return (
		<ins
			className={`${className} adsbygoogle`}
			style={style}
			data-ad-client={client}
			data-ad-slot={slot}
			data-ad-layout={layout}
			data-ad-format={format}
			data-full-width-responsive={responsive}
			{...props}
		/>
	);
};

// AddsByGoogle.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object, // eslint-disable-line
//   client: PropTypes.string.isRequired,
//   slot: PropTypes.string.isRequired,
//   layout: PropTypes.string,
//   format: PropTypes.string,
//   responsive: PropTypes.string
// };

// AddsByGoogle.defaultProps = {
//   className: '',
//   style: {display: 'block'},
//   format: 'auto',
//   layout: '',
//   responsive: 'false'
// };

export default AddsByGoogle;
