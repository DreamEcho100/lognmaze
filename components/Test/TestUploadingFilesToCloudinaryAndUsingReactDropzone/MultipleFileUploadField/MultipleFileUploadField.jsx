import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import UploadError from './UploadError/UploadError';
import SingleFileUploadReadProgress from './SingleFileUploadReadProgress/SingleFileUploadReadProgress';

const MultipleFileUploadField = () => {
	const [files, setFiles] = useState([]);

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
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
		accept: ['image/*' /*, 'video/*', '.pdf'*/],
		maxSize: 300 * 1024, // 300KB
	});

	const onUpload = (file, url) => {
		console.log(file, url);
		setFiles((currentFiles) =>
			currentFiles.map((fw) => {
				if (fw.file === file) {
					return { ...fw, url };
				}
				return fw;
			})
		);
	};

	const onDelete = (file) => {
		setFiles((currentFiles) => currentFiles.filter((fw) => fw.file !== file));
	};

	return (
		<>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the files here ...</p>
				) : (
					<p>Drag 'n' drop some files here, or click to select files</p>
				)}
			</div>

			{files.map(({ file, url, ...fileWrapper }, index) =>
				fileWrapper.errors.length ? (
					<UploadError
						key={index}
						file={file}
						onDelete={onDelete}
						errors={fileWrapper.errors}
					/>
				) : (
					<SingleFileUploadReadProgress
						key={index}
						file={file}
						url={url}
						onDelete={onDelete}
						onUpload={onUpload}
					/>
				)
			)}
		</>
	);
};

export default MultipleFileUploadField;
