import { useState } from 'react';
import dynamic from 'next/dynamic';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import withClassName from '@commonLibIndependent/hoc/withClassName';

const DynamicNewsItemActionTypeUpdate = dynamic(
	() => import('@coreComponents/News/Item/Action/Type/Update')
);
const DynamicNewsItemActionTypeDelete = dynamic(
	() => import('@coreComponents/News/Item/Action/Type/Delete')
);

const {
	Root,
	Trigger,
	Content,
	// Label,
	Item,
	// Separator,
	// Group,
	// CheckboxItem,
	// ItemIndicator,
	// RadioGroup,
	// RadioItem,
	// TriggerItem,
	// Arrow,
} = Dropdown;

interface IProps {
	newsItemData: TNewsItemData;
	userToken?: string;
}

const StyledTrigger = withClassName(Trigger, classes.triggerButton);
const StyledMainContent = withClassName(Content, classes.mainContent);
const StyledMainContentItem = withClassName(Item, classes.mainContentItem);

const CustomDropdown = ({ newsItemData, userToken }: IProps) => {
	const [
		isNewsItemTypeUpdateActionModalVisible,
		setIsNewsItemTypeUpdateActionModalVisible,
	] = useState(false);
	const [
		isNewsItemTypeDeleteActionModalVisible,
		setIsNewsItemTypeDeleteActionModalVisible,
	] = useState(false);

	const newsItemTypeUpdateActionModalVisibilityHandler = (
		isNewsItemTypeUpdateActionModalVisible?: boolean
	) =>
		setIsNewsItemTypeUpdateActionModalVisible((prevState) =>
			typeof isNewsItemTypeUpdateActionModalVisible !== 'boolean'
				? !prevState
				: isNewsItemTypeUpdateActionModalVisible
		);
	const newsItemTypeDeleteActionModalVisibilityHandler = (
		isNewsItemTypeDeleteActionModalVisible?: boolean
	) =>
		setIsNewsItemTypeDeleteActionModalVisible((prevState) =>
			typeof isNewsItemTypeDeleteActionModalVisible !== 'boolean'
				? !prevState
				: isNewsItemTypeDeleteActionModalVisible
		);

	return (
		<>
			<Root>
				<StyledTrigger>
					<FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
				</StyledTrigger>

				<StyledMainContent>
					{/* <Group> */}
					{/* <Label /> */}
					<StyledMainContentItem>
						<button
							onClick={() =>
								newsItemTypeUpdateActionModalVisibilityHandler(true)
							}
						>
							Update
						</button>
					</StyledMainContentItem>
					<hr />
					<StyledMainContentItem>
						<button
							onClick={() =>
								newsItemTypeDeleteActionModalVisibilityHandler(true)
							}
						>
							Delete
						</button>
					</StyledMainContentItem>
					<hr />
					<StyledMainContentItem>Share</StyledMainContentItem>
					{/* </Group> */}

					{/* <Group>
					<Item />
				</Group>

				<CheckboxItem>
					<ItemIndicator />
				</CheckboxItem>

				<RadioGroup>
					<RadioItem value={''}>
						<ItemIndicator />
					</RadioItem>
				</RadioGroup>

				<Separator />
				<Root>
					<TriggerItem>Sub menu →</TriggerItem>
					<Content>
						<Item>Sub menu item</Item>
						<Item>Sub menu item</Item>
						<Arrow />
					</Content>
				</Root>
				<Separator />

				<Root>
					<TriggerItem />
					<Content />
				</Root>

				<Separator />
				<Arrow /> */}
				</StyledMainContent>
			</Root>

			<DynamicNewsItemActionTypeUpdate
				newsItemData={newsItemData}
				userToken={userToken}
				modalVisibilityHandler={newsItemTypeUpdateActionModalVisibilityHandler}
				isModalVisible={isNewsItemTypeUpdateActionModalVisible}
			/>
			<DynamicNewsItemActionTypeDelete
				newsItemData={newsItemData}
				userToken={userToken}
				modalVisibilityHandler={newsItemTypeDeleteActionModalVisibilityHandler}
				isModalVisible={isNewsItemTypeDeleteActionModalVisible}
			/>
		</>
	);
};

export default CustomDropdown;
