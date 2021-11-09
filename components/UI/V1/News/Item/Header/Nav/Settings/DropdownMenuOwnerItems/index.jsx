import UpdateNews from './UpdateNews';
import DeleteNews from './DeleteNews';

const DynamicDropdownMenuOwnerItems = ({ newsItemData }) => {
	return (
		<>
			<li>
				<UpdateNews newsItemData={newsItemData} />
			</li>
			<li>
				<DeleteNews newsItemData={newsItemData} />
			</li>
		</>
	);
};

export default DynamicDropdownMenuOwnerItems;
