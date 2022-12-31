import type { Dispatch, SetStateAction } from 'react';

import Dialog, { DialogHeader } from '@components/shared/common/Dialog';
import { useCreativeWorkSharedState } from '..';
import { trpcAPI } from '@utils/trpc';
import Button from '@components/shared/common/Button';
// import DeleteCreativeWork from '../Forms/Delete';

type Props = {
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
	isDialogOpen: boolean;
	creativeWorkId: string;
	authorId: string;
}; // & Parameters<typeof DeleteCreativeWork>[0];

const DeleteCreativeWorkDialog = ({
	isDialogOpen,
	setIsDialogOpen,
	creativeWorkId,
	authorId
}: Props) => {
	// const [isDialogOpen, setIsDialogOpen] = useState(false);
	// const [selectedIndex, setSelectedIndex] = useState<AllowedFormTypeIndex>(0);
	const { onDeletingCreativeWork } = useCreativeWorkSharedState();
	const creativeWorksDelete =
		trpcAPI.creativeWorks.authors.delete.useMutation();

	return (
		<Dialog
			onClose={() => setIsDialogOpen(false)}
			show={isDialogOpen}
			defaultCloseButtonActive
		>
			<DialogHeader
				title={'Delete Creative Work'}
				description={'Are you sure you want to delete this creative work?'}
			/>
			<form
				className='flex flex-wrap items-center justify-center gap-4'
				onSubmit={async (event) => {
					event.preventDefault();

					if (creativeWorksDelete.isLoading) return;

					await creativeWorksDelete
						.mutateAsync({
							creativeWorkId,
							authorId
						})
						.then(() => {
							onDeletingCreativeWork({ creativeWorkId });
						});
				}}
			>
				<Button
					type='submit'
					variants={{ p: 'sm' }}
					disabled={creativeWorksDelete.isLoading}
				>
					yes
				</Button>
				<Button
					type='submit'
					variants={{ p: 'sm' }}
					disabled={creativeWorksDelete.isLoading}
				>
					no
				</Button>
			</form>
		</Dialog>
	);
};

export default DeleteCreativeWorkDialog;
