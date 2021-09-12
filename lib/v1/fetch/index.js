export const uploadFileToCloudinary = (
	url,
	presetKey,
	file,
	onProgress,
	onError
) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open('POST', url);

		xhr.onload = () => {
			const response = JSON.parse(xhr.responseText);
			resolve(response.secure_url);
		};

		xhr.onerror = (event) => {
			onError(event.type);
			reject(event);
		};

		xhr.ontimeout = (event) => {
			onError(event.type);
			reject(event);
		};

		xhr.onabort = (event) => {
			onError(event.type);
			reject(event);
		};

		if (onProgress) {
			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const percentage = (event.loaded / event.total) * 100;
					onProgress(Math.round(percentage));
				}
			};
		}

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', presetKey);

		xhr.send(formData);
	});
};
