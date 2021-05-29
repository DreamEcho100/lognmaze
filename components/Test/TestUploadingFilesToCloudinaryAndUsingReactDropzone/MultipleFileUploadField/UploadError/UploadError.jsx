import FileHeader from '../FileHeader/FileHeader';
import LinearProgressBar from '../LinearProgressBar/LinearProgressBar';

const UploadError = ({ file, onDelete, errors = [] }) => {
	return (
		<div>
			<FileHeader file={file} onDelete={onDelete} />
			<LinearProgressBar length={100} color={'red'} />
			{errors.map((error) => (
				<div key={error.code}>
					<p style={{ color: 'red' }}>{error.message}</p>
				</div>
			))}
		</div>
	);
};

export default UploadError;
