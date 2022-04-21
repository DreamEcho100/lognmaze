import { Dispatch, FC, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DropdownRoot from '@commonComponentsIndependent/Dropdown';
import DropdownTriggerMenu from '@commonComponentsIndependent/Dropdown/Trigger';
import DropdownList from '@commonComponentsIndependent/Dropdown/List';

interface IProps {
	isDropdownListVisible: boolean;
	setIsDropdownListVisible: Dispatch<SetStateAction<boolean>>;
}
const CustomDropdown: FC<IProps> = ({
	isDropdownListVisible,
	setIsDropdownListVisible,
	children,
}) => {
	return (
		<>
			<DropdownRoot
				setIsDropdownListVisible={setIsDropdownListVisible}
				isDropdownListVisible={isDropdownListVisible}
			>
				<DropdownTriggerMenu
					title='News item setting button'
					setIsDropdownListVisible={setIsDropdownListVisible}
				>
					<FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
				</DropdownTriggerMenu>

				<DropdownList isDropdownListVisible={isDropdownListVisible}>
					{children}
				</DropdownList>
			</DropdownRoot>

			{/* {userData?.id && <></>} */}
		</>
	);
};

export default CustomDropdown;
