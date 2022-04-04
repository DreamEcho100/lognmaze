import { useState } from 'react';
import dynamic from 'next/dynamic';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import { useUserSharedState } from '@store/UserContext';
import withClassName from '@commonLibIndependent/hoc/withClassName';

const DynamicNewsItemActionTypeUpdate = dynamic(
	() => import('@coreComponents/News/Item/Action/Type/Update')
);
const DynamicNewsItemActionTypeDelete = dynamic(
	() => import('@coreComponents/News/Item/Action/Type/Delete')
);
const DynamicCustomShareModelComponent = dynamic(
	() => import('@commonComponentsIndependent/CustomShareModel')
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
}

const StyledTrigger = withClassName(Trigger, classes.triggerButton);
const StyledMainContent = withClassName(Content, classes.mainContent);
const StyledMainContentItem = withClassName(Item, classes.mainContentItem);

const CustomDropdown = ({ newsItemData }: IProps) => {
	const [
		{
			data: { user: userData, token: userToken },
		},
	] = useUserSharedState();

	const [
		isNewsItemTypeUpdateActionModalVisible,
		setIsNewsItemTypeUpdateActionModalVisible,
	] = useState(false);
	const [
		isNewsItemTypeDeleteActionModalVisible,
		setIsNewsItemTypeDeleteActionModalVisible,
	] = useState(false);

	const [
		isCustomShareModelComponentVisible,
		setIsCustomShareModelComponentVisible,
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
	const customShareModelComponentVisibilityHandler = (
		isCustomShareModelComponentVisible?: boolean
	) =>
		setIsCustomShareModelComponentVisible((prevState) =>
			typeof isCustomShareModelComponentVisible !== 'boolean'
				? !prevState
				: isCustomShareModelComponentVisible
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
					{userData?.id && (
						<>
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
						</>
					)}
					<StyledMainContentItem>
						<button
							onClick={() => customShareModelComponentVisibilityHandler()}
						>
							Share
						</button>
					</StyledMainContentItem>
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

			{userData?.id && (
				<>
					{isNewsItemTypeUpdateActionModalVisible && (
						<DynamicNewsItemActionTypeUpdate
							newsItemData={newsItemData}
							userToken={userToken}
							modalVisibilityHandler={
								newsItemTypeUpdateActionModalVisibilityHandler
							}
							isModalVisible={isNewsItemTypeUpdateActionModalVisible}
						/>
					)}
					{isNewsItemTypeDeleteActionModalVisible && (
						<DynamicNewsItemActionTypeDelete
							newsItemData={newsItemData}
							userToken={userToken}
							modalVisibilityHandler={
								newsItemTypeDeleteActionModalVisibilityHandler
							}
							isModalVisible={isNewsItemTypeDeleteActionModalVisible}
						/>
					)}
				</>
			)}
			{/* {isCustomShareModelComponentVisible && ( */}
			<DynamicCustomShareModelComponent
				isModalVisible={isCustomShareModelComponentVisible}
				modalVisibilityHandler={customShareModelComponentVisibilityHandler}
				platforms='all'
				itemData={newsItemData}
			/>
			{/* )} */}
		</>
	);
};

export default CustomDropdown;
