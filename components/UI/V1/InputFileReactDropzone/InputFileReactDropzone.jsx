import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import classes from './InputFileReactDropzone.module.css';
import BoxShadowClasses from '../BoxShadow.module.css';

import { handleAllClasses } from '../utils/index';

const InputFileReactDropzone = ({
	defaultClasses = 'input-file-container',
	extraClasses = '',
	className = '',
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

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	return (
		<div
			className={`${allClasses} ${BoxShadowClasses['box-shadow']} ${
				isDragActive ? classes['drag-landing'] : ''
			}`}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<p>Drag 'n' drop some files here, or click to select files</p>
		</div>
	);
};

export default InputFileReactDropzone;
