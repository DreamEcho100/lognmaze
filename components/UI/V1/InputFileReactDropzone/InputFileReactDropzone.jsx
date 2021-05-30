import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const InputFileReactDropzone = ({
	acceptedFormats = ['image/*' /*, 'video/*', '.pdf'*/],
	maxSize = 300 * 1024, // 300KB
	setFiles,
	onDrop,
}) => {
	onDrop = onDrop
		? onDrop
		: useCallback((acceptedFiles, rejectedFiles) => {
				// Do something with the files
				const mappedAcceptedFiles = acceptedFiles.map((file) => ({
					file,
					errors: [],
				}));

				setFiles((currentFiles) => [
					...currentFiles,
					...mappedAcceptedFiles,
					...rejectedFiles,
				]);
		  }, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: acceptedFormats,
		maxSize,
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
	);
};

export default InputFileReactDropzone;
