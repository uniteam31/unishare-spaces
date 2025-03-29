import { TSpaceMember, useGetCurrentSpaceInfo } from 'entitites/Space';
import { useState } from 'react';
import { ConfirmModal, Text, TextTheme } from 'shared/ui';
import { useDeleteSpaceMember } from '../api/useDeleteSpaceMember';
import s from './DeleteSpaceMember.module.scss';

type Props = {
	userID: TSpaceMember['id'];
};

export const DeleteSpaceMember = (props: Props) => {
	const { userID } = props;

	const [isDeleteMemberModal, setIsDeleteMemberModal] = useState(false);

	const { mutateSpace } = useGetCurrentSpaceInfo();
	// TODO: лоадеры
	const { deleteSpaceMember, isLoading: isDeleting, error } = useDeleteSpaceMember();

	const handleToggleDeleteModal = () => {
		setIsDeleteMemberModal((prev) => !prev);
	};

	const updateCachedMembers = () => {
		mutateSpace((space) => {
			if (space) {
				return {
					...space,
					members: space.members.filter((member) => member.id !== userID),
				};
			}
		}).finally();
	};

	const handleDeleteMember = () => {
		deleteSpaceMember({ userID }).then(() => updateCachedMembers());
	};

	return (
		<>
			<div role={'button'} className={s.DeleteSpaceMember} onClick={handleToggleDeleteModal}>
				Удалить участника
			</div>

			{isDeleteMemberModal && (
				<ConfirmModal
					isOpen={isDeleteMemberModal}
					onClose={handleToggleDeleteModal}
					onSuccess={handleDeleteMember}
					onCancel={handleToggleDeleteModal}
					isLoading={isDeleting}
					errors={error}
				>
					<Text
						title={'Удаление пользователя'}
						text={'Вы уверены, что хотите удалить пользователя из пространства?'}
						theme={TextTheme.ERROR}
					/>
				</ConfirmModal>
			)}
		</>
	);
};
