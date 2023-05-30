import type { inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '@server/trpc/router/_app';
import type { FormEvent } from 'react';

import { CreativeWorkStatus } from '@prisma/client';
import { useMemo, useState } from 'react';
import FormField from '@components/shared/common/FormField';
import SelectTags from '@components/shared/common/SelectTags';
import Button from '@components/shared/common/Button';
import slug from 'slug';
// import {
// 	defaultLang,
// 	IETF_BCP_47_STANDARD,
// 	LangsOptions
// } from '@utils/core/Langs';

type PostFormInitProps = {
	typeDataDefaults?: inferRouterInputs<AppRouter>['creativeWorks']['authors']['posts']['createOne']['typeData'];
	creativeWorkDefaults?: Required<
		Omit<
			inferRouterInputs<AppRouter>['creativeWorks']['authors']['posts']['createOne'],
			'typeData' | 'authorId' | 'tags'
		>
	>;
	tagsDefaults?: {
		key: string;
		value: string;
	}[];
};

export type PostFormProps = PostFormInitProps & {
	handleOnSubmit: (
		event: FormEvent,
		data: {
			typeData: NonNullable<PostFormInitProps['typeDataDefaults']>;
			tags: string[]; // NonNullable<PostFormInitProps['tagsDefaults']>;
			creativeWork: NonNullable<PostFormInitProps['creativeWorkDefaults']>;
		}
	) => boolean | Promise<boolean>;
	isDisabled?: boolean;
	resetFormOnSuccessfulSubmission?: boolean;
};

const PostForm = ({
	typeDataDefaults = {
		// languageTagId: defaultLang.id,
		content: ''
	},
	creativeWorkDefaults = {
		status: CreativeWorkStatus.PUBLIC
	},
	tagsDefaults = [],
	handleOnSubmit,
	resetFormOnSuccessfulSubmission,
	isDisabled = false
}: PostFormProps) => {
	const [typeDataValues, setPostValues] = useState(typeDataDefaults);
	// const selectedLang = useMemo(
	// 	() =>
	// 		IETF_BCP_47_STANDARD.body.find(
	// 			(item) => item.id === typeDataValues.languageTagId
	// 		),
	// 	[typeDataValues.languageTagId]
	// );

	const [tags, setTags] = useState(tagsDefaults);
	const [creativeWorkValues, setCreativeWork] = useState(creativeWorkDefaults);

	const creativeWorkStatusOptions = useMemo(
		() =>
			Object.values(CreativeWorkStatus)
				.filter((item) => item !== CreativeWorkStatus.DELETED)
				.map((item) => ({
					children: item.toLocaleLowerCase(),
					value: item
				})),
		[]
	);

	return (
		<form
			className='flex flex-col gap-4'
			onSubmit={async (event) => {
				if (
					await handleOnSubmit(event, {
						typeData: typeDataValues,
						tags: tags.map((item) => item.value),
						creativeWork: creativeWorkValues
					})
				) {
					if (resetFormOnSuccessfulSubmission) {
						setPostValues(typeDataDefaults);
						setTags(tagsDefaults);
						setCreativeWork(creativeWorkDefaults);
					}
				}
			}}
		>
			<FormField
				isA='dropdown'
				options={creativeWorkStatusOptions}
				values={creativeWorkValues}
				setValues={setCreativeWork}
				name='status'
				labelText='Status'
				labelVariants={{ display: 'dynamicOnSmScreens' }}
				labelTextVariants={{ w: '20%max-6rem' }}
			/>
			{/* <FormField
				isA='dropdown'
				options={LangsOptions}
				values={typeDataValues}
				setValues={setPostValues}
				name='languageTagId'
				labelText='Main Language'
				labelVariants={{ display: 'dynamicOnSmScreens' }}
				labelTextVariants={{ w: '20%max-6rem' }}
				title={selectedLang?.description}
			/> */}
			<FormField
				isA='textarea'
				values={typeDataValues}
				setValues={setPostValues}
				name='content'
				labelText='content'
				minLength={3}
				rows={6}
			/>
			<SelectTags
				tags={tags}
				setTags={setTags}
				filterFunc={(item) => (prevIem) => prevIem.value !== item.value}
				addFunc={(prev, _item) => {
					const items = _item
						.split(/\s+/)
						.map((item) => {
							const slugifiedItem = slug(item);
							return { key: slugifiedItem, value: slugifiedItem };
						})
						.filter(
							(item) =>
								item && !prev.some((prevItem) => prevItem.value === item.value)
						);

					if (items.length === 0) return prev;

					return [...prev, ...items];
				}}
			/>
			<div className=''>
				<Button disabled={isDisabled} type='submit'>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default PostForm;
