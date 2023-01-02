import type { NextPage } from 'next';

import GenerateFractalTreeScreen from '@components/screens/Tools/GenerateFractalTree';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import { generateFractalTreeTool } from '@utils/core/appData/tools';

const GenerateFractalTreePage: NextPage<null> = () => {
	return (
		<>
			<CustomNextSeo
				pageTitle={generateFractalTreeTool.title}
				pageDescription={generateFractalTreeTool.description}
			/>
			<GenerateFractalTreeScreen />{' '}
		</>
	);
};

export default GenerateFractalTreePage;
