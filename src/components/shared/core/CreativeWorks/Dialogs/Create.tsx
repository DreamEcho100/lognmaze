import type { AllowedFormTypeIndex } from '../Forms/Create';
import type { Dispatch, SetStateAction } from 'react';
import type { TOnAddingCreativeWork } from '../Forms/utils/ts';

import Dialog, { DialogHeader } from '@components/shared/common/Dialog';
import CreateCreativeWork from '../Forms/Create';

type Props = {
	authorId: string;
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
	isDialogOpen: boolean;
	setSelectedIndex: Dispatch<SetStateAction<AllowedFormTypeIndex>>;
	selectedIndex: AllowedFormTypeIndex;
	onAddingCreativeWork?: TOnAddingCreativeWork;
};

const CreateCreativeWorkDialog = ({
	authorId,
	isDialogOpen,
	selectedIndex,
	setIsDialogOpen,
	setSelectedIndex,
	onAddingCreativeWork
}: Props) => {
	// const [isDialogOpen, setIsDialogOpen] = useState(false);
	// const [selectedIndex, setSelectedIndex] = useState<AllowedFormTypeIndex>(0);

	return (
		<Dialog
			onClose={() => setIsDialogOpen(false)}
			show={isDialogOpen}
			defaultCloseButtonActive
		>
			<DialogHeader
				title={'Creative Work'}
				description={'Choose and Create \u{1F917}'}
			/>
			<CreateCreativeWork
				onAddingCreativeWork={onAddingCreativeWork}
				authorId={authorId}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
				blogPost
				post
			/>
		</Dialog>
	);
};

export default CreateCreativeWorkDialog;
