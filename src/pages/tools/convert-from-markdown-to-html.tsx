import type { NextPage } from 'next';

import ConvertFromMarkdownToHTMLScreen from '@components/screens/Tools/ConvertFromMarkdownToHTML';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import { convertFromMarkdownToHTMLTool } from '@utils/core/appData/tools';

const ConvertFromMarkdownToHTMLPage: NextPage<null> = () => {
	return (
		<>
			<CustomNextSeo
				pageTitle={convertFromMarkdownToHTMLTool.title}
				pageDescription={convertFromMarkdownToHTMLTool.description}
			/>{' '}
			<ConvertFromMarkdownToHTMLScreen />{' '}
		</>
	);
};

export default ConvertFromMarkdownToHTMLPage;
