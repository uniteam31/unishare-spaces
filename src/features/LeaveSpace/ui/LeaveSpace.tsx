import { useGetCurrentSpaceInfo, useGetUserSpaces } from 'entitites/Space';
import { useUserStore } from 'entitites/User';
import { useState } from 'react';
import { SpaceIDController } from 'shared/lib';
import { Button, ConfirmModal, Text, TextTheme, Warning } from 'shared/ui';
import { useLeaveCurrentSpace } from '../api/useLeaveCurrentSpace';

type Props = {
	className?: string;
};

export const LeaveSpace = (props: Props) => {
	const { className } = props;

	const [isLeaveSpaceModal, setIsLeaveSpaceModal] = useState(false);

	const { space } = useGetCurrentSpaceInfo();
	const { mutateSpaces } = useGetUserSpaces();
	const { authData } = useUserStore();

	const {
		leaveCurrentSpace,
		isLoading: isLeavingSpace,
		error: leaveSpaceError,
	} = useLeaveCurrentSpace();

	const handleToggleModal = () => {
		setIsLeaveSpaceModal((prev) => !prev);
	};

	const handleSuccess = () => {
		leaveCurrentSpace().then(() => {
			const currentSpaceID = SpaceIDController.getCurrentSpaceID();

			mutateSpaces((spaces) => spaces?.filter((space) => space.id !== currentSpaceID)).then(
				(mutateSpaces) => {
					if (mutateSpaces?.length) {
						SpaceIDController.setCurrentSpaceIDAndSendEvent(mutateSpaces[0].id);
					} else {
						SpaceIDController.clearCurrentSpaceID();
					}
				},
			);

			handleToggleModal();
		});
	};

	const handleCancel = () => {
		handleToggleModal();
	};

	const isUserSpaceOwner = space?.ownerID === authData?.id;

	return (
		<>
			<Button className={className} theme={'red'} onClick={handleToggleModal}>
				Выйти
			</Button>

			{isLeaveSpaceModal && (
				<ConfirmModal
					isOpen={isLeaveSpaceModal}
					onClose={handleToggleModal}
					onSuccess={handleSuccess}
					onCancel={handleCancel}
					isLoading={isLeavingSpace}
					errors={leaveSpaceError}
				>
					{isUserSpaceOwner && (
						<Warning
							title={'Вы владелец пространства!'}
							text={'При выходе у пространства больше не будет владельца'}
							theme={'red'}
						/>
					)}

					<Text
						title={'Выход'}
						text={'Вы уверены, что хотите выйти из пространства?'}
						theme={TextTheme.ERROR}
					/>
				</ConfirmModal>
			)}
		</>
	);
};
