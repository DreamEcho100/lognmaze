import { useEffect, useState } from 'react';

import FileHeader from '../FileHeader/FileHeader';
import LinearProgressBar from '../LinearProgressBar/LinearProgressBar';

const uploadFile = (file, onProgress) => {
	const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`; // `/mazecode`;
	// 'https://api.cloudinary.com/v1_1/demo/image/upload'

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open('POST', url);

		xhr.onload = () => {
			const response = JSON.parse(xhr.responseText);
			console.log(response);
			resolve(response.secure_url);
		};

		xhr.onerror = (event) => reject(event);

		xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				const percentage = (event.loaded / event.total) * 100;
				onProgress(Math.round(percentage));
			}
		};

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET_KEY);

		xhr.send(formData);
	});
};

const SingleFileUploadReadProgress = ({ file, url, onDelete, onUpload }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const upload = async () => {
			const url = await uploadFile(file, setProgress);
			onUpload(file, url);
			console.log('url', url);
		};

		upload();
	}, []);

	return (
		<div
			style={{
				padding: '0em 0.5em',
			}}
		>
			<FileHeader file={file} url={url} onDelete={onDelete} />
			{/* <div className={classes['progress-bar-container']}></div> */}
			{/* <div
				style={{
					'--progress-bar-length': progress,
				}}
				className={classes['progress-bar']}
			></div> */}
			<LinearProgressBar length={progress} />
			<p>{progress}</p>
		</div>
	);
};

export default SingleFileUploadReadProgress;
