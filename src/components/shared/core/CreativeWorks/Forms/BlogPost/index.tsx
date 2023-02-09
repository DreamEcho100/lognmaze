import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@server/trpc/router/_app';
import type { FormEvent } from 'react';
import type { TOnAddingCreativeWork } from '../utils/ts';

import { CreativeWorkStatus } from '@prisma/client';
import { useMemo, useState } from 'react';
import FormField from '@components/shared/common/FormField';
import SelectTags from '@components/shared/common/SelectTags';
import Button from '@components/shared/common/Button';
import {
	defaultLang,
	IETF_BCP_47_STANDARD,
	LangsOptions
} from '@utils/core/Langs';
import { trpcAPI } from '@utils/trpc';
import slug from 'slug';

type BlogPostFormInitProps = {
	typeDataDefaults?: inferRouterInputs<AppRouter>['creativeWorks']['authors']['blogPosts']['createOne']['typeData'];
	creativeWorkDefaults?: Required<
		Omit<
			inferRouterInputs<AppRouter>['creativeWorks']['authors']['blogPosts']['createOne'],
			'typeData' | 'authorId' | 'Tags'
		>
	>;
	tagsDefaults?: {
		key: string;
		value: string;
	}[];
};

export type BlogPostFormProps = BlogPostFormInitProps & {
	onAddingCreativeWork?: TOnAddingCreativeWork;
	handleOnSubmit: (
		event: FormEvent,
		data: {
			typeData: NonNullable<BlogPostFormInitProps['typeDataDefaults']>;
			Tags: string[]; // NonNullable<BlogPostFormInitProps['tagsDefaults']>;
			CreativeWork: NonNullable<BlogPostFormInitProps['creativeWorkDefaults']>;
		}
	) => boolean | Promise<boolean>;
	resetFormOnSuccessfulSubmission?: boolean;
	isDisabled?: boolean;
	creativeWorkDataToGetContentFor?: Omit<
		inferRouterInputs<AppRouter>['creativeWorks']['blogPosts']['getContentOfOne'],
		'authorId'
	> & { authorId: string };
	handleOnUpdatingCreativeWork?: (
		props: inferRouterOutputs<AppRouter>['creativeWorks']['blogPosts']['getContentOfOne']
	) => void;
};

const BlogPostForm = ({
	typeDataDefaults = {
		content: '',
		description: '',
		languageTagId: defaultLang.id,
		thumbnailUrl: '',
		title: ''
	},
	creativeWorkDefaults = {
		status: CreativeWorkStatus.PUBLIC
	},
	tagsDefaults = [],
	handleOnSubmit,
	resetFormOnSuccessfulSubmission,
	isDisabled = false,
	creativeWorkDataToGetContentFor,
	handleOnUpdatingCreativeWork
}: BlogPostFormProps) => {
	const [typeDataValues, setBlogPostValues] = useState(typeDataDefaults);
	const selectedLang = useMemo(
		() =>
			IETF_BCP_47_STANDARD.body.find(
				(item) => item.id === typeDataValues.languageTagId
			),
		[typeDataValues.languageTagId]
	);

	const getContentForCreativeWork =
		trpcAPI.creativeWorks.blogPosts.getContentOfOne.useQuery(
			creativeWorkDataToGetContentFor || { creativeWorkId: '' },
			{
				enabled: !!creativeWorkDataToGetContentFor && !typeDataDefaults.content,
				onSuccess: (result) => {
					if (!creativeWorkDataToGetContentFor || !handleOnUpdatingCreativeWork)
						return;

					handleOnUpdatingCreativeWork(result);

					if (typeDataValues.content !== result.content)
						setBlogPostValues((prev) => ({
							...prev,
							content: result.content
						}));
				}
			}
		);

	const [Tags, setTags] = useState(tagsDefaults);
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

	const isSubmitButtonDisabled =
		isDisabled ||
		(typeDataDefaults.content.length === 0 &&
			getContentForCreativeWork.isLoading &&
			getContentForCreativeWork.isFetching);

	return (
		<form
			className='flex flex-col gap-4'
			onSubmit={async (event) => {
				if (isSubmitButtonDisabled) return;

				if (
					await handleOnSubmit(event, {
						typeData: typeDataValues,
						Tags: Tags.map((item) => item.value),
						CreativeWork: creativeWorkValues
					})
				) {
					if (resetFormOnSuccessfulSubmission) {
						setBlogPostValues(typeDataDefaults);
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
			<FormField
				isA='dropdown'
				options={LangsOptions}
				values={typeDataValues}
				setValues={setBlogPostValues}
				name='languageTagId'
				labelText='Main Language'
				labelVariants={{ display: 'dynamicOnSmScreens' }}
				labelTextVariants={{ w: '20%max-6rem' }}
				title={selectedLang?.description}
			/>
			<FormField
				values={typeDataValues}
				setValues={setBlogPostValues}
				name='title'
				labelText='title'
				min={3}
			/>
			<FormField
				values={typeDataValues}
				setValues={setBlogPostValues}
				name='thumbnailUrl'
				labelText='thumbnailUrl'
				min={3}
			/>
			<SelectTags
				Tags={Tags}
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
			<FormField
				isA='textarea'
				values={typeDataValues}
				setValues={setBlogPostValues}
				name='description'
				labelText='description'
				minLength={3}
				rows={2}
			/>
			{/* toLoadContentIfNotFound? */}
			<FormField
				isA='textarea'
				values={typeDataValues}
				setValues={setBlogPostValues}
				name='content'
				labelText='content'
				minLength={3}
				rows={6}
			/>
			<div className=''>
				<Button disabled={isSubmitButtonDisabled} type='submit'>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default BlogPostForm;
