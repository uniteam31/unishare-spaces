import { Skeleton, Warning } from '@uniteam31/uni-shared-ui';
import { useGetFriendsList } from 'entitites/Friends';
import { Space, useGetCurrentSpaceInfo } from 'entitites/Space';
import { AddSpaceMember } from 'features/AddSpaceMember';
import { ModalUI, Text, TextAlign } from 'shared/ui';
import s from './AddMembersModal.module.scss';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const AddMembersModal = (props: Props) => {
	const { isOpen, onClose } = props;

	const {
		friendsList,
		isLoading: isFriendsLoading,
		error: friendsListError,
	} = useGetFriendsList();
	const {
		space,
		isLoading: isSpaceInfoLoading,
		error: spaceInfoError,
	} = useGetCurrentSpaceInfo();

	const candidates = friendsList.filter(
		(friend) => !space?.members.find((member) => member.id === friend.id),
	);

	const renderContent = () => {
		if (isSpaceInfoLoading || isFriendsLoading) {
			return Array.from({ length: 3 }).map((_, i) => (
				<Skeleton key={i} className={s.skeleton} />
			));
		}

		if (friendsListError || spaceInfoError) {
			return <Warning title={'Ошибка'} text={friendsListError || spaceInfoError} />;
		}

		if (!candidates.length) {
			return (
				<Warning
					title={'Список пуст'}
					text={'У вас нет друзей, которых вы можете добавить'}
					theme={'blue'}
				/>
			);
		}

		return candidates.map((candidate) => (
			<Space.MemberCard
				key={candidate.id}
				{...candidate}
				contentRight={<AddSpaceMember userID={candidate.id} />}
			/>
		));
	};

	return (
		<ModalUI onClose={onClose} isOpen={isOpen}>
			<Text title={'Добавить участников'} align={TextAlign.CENTER} className={s.header} />

			<div className={s.list}>{renderContent()}</div>
		</ModalUI>
	);
};
