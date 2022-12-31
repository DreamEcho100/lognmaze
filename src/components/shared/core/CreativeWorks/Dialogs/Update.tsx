import type { Dispatch, SetStateAction } from 'react';

import Dialog, { DialogHeader } from '@components/shared/common/Dialog';
import UpdateCreativeWork from '../Forms/Update';

type Props = {
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
	isDialogOpen: boolean;
} & Parameters<typeof UpdateCreativeWork>[0];

const UpdateCreativeWorkDialog = ({
	isDialogOpen,
	setIsDialogOpen,
	...props
}: Props) => {
	// const [isDialogOpen, setIsDialogOpen] = useState(false);
	// const [selectedIndex, setSelectedIndex] = useState<AllowedFormTypeIndex>(0);

	return (
		<Dialog
			onClose={() => setIsDialogOpen(false)}
			show={isDialogOpen}
			defaultCloseButtonActive
		>
			<DialogHeader title={'Update Creative Work'} />
			<UpdateCreativeWork {...props} />
		</Dialog>
	);
};

export default UpdateCreativeWorkDialog;
