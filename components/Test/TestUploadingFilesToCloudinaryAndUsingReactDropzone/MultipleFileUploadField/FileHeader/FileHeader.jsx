const FileHeader = ({ file, url, onDelete }) => {
	console.log(file);
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<p>
				{url ? (
					<>
						<strong>Location:</strong>{' '}
						<em>
							<a href={url} target='_blank' rel='noopener noreferrer'>
								{file.name}
							</a>
						</em>
					</>
				) : (
					<p>{file.name}</p>
				)}
			</p>
			<button onClick={() => onDelete(file)}>Delete</button>
		</div>
	);
};

export default FileHeader;
