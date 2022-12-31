import {
	isCreativeWorABlogPost,
	isCreativeWorAPost
} from '@utils/core/creative-works';
import UpdateBlogPostForm from './BlogPost/Update';
// import UpdatePostForm from './Post/Update';

import type { TCreativeWorkTypeData } from '@ts/index';
import UpdatePostForm from './Post/Update';

type Props = {
	data: TCreativeWorkTypeData;
};

const UpdateCreativeWork = ({ data }: Props) => {
	const defaultData = {
		authorId: data.authorId,
		creativeWorkId: data.id,
		creativeWorkDefaults: {
			status: data.status !== 'DELETED' ? data.status : 'PRIVATE'
		},
		tagsDefaults: data.tags.map((tag) => ({
			key: tag.name.toLowerCase(),
			value: tag.name
		}))
	};

	if (isCreativeWorABlogPost(data))
		return (
			<UpdateBlogPostForm
				typeDataDefaults={{
					title: data.typeData.title,
					description: data.typeData.description,
					languageTagId: data.typeData.languageTagId,
					thumbnailUrl: data.typeData.thumbnailUrl,
					content: data.typeData.content || ''
				}}
				{...defaultData}
			/>
		);
	if (isCreativeWorAPost(data))
		return (
			<UpdatePostForm
				typeDataDefaults={{
					content: data.typeData.content
				}}
				{...defaultData}
			/>
		);

	return <>{/* <UpdatePostForm authorId={authorId} /> */}</>;
};

export default UpdateCreativeWork;
