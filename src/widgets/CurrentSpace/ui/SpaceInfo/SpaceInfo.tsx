import { Space, useGetCurrentSpaceInfo } from 'entitites/Space';
import { useUserStore } from 'entitites/User';
import { useState } from 'react';
import { DeleteSpaceMember } from 'features/DeleteSpaceMember';
import { LeaveSpace } from 'features/LeaveSpace';
import { Avatar, Divider, Text, Button } from 'shared/ui';
import { AddMembersModal } from '../AddMembersModal/AddMembersModal';
import s from './SpaceInfo.module.scss';

export const SpaceInfo = () => {
	const { authData } = useUserStore();

	const [isAddSpaceMembersModalOpen, setIsAddSpaceMembersModalOpen] = useState(false);

	const handleToggleAddSpaceMembersList = () => {
		setIsAddSpaceMembersModalOpen((prev) => !prev);
	};

	const { space } = useGetCurrentSpaceInfo();

	// TODO: в будущем проверять и по редакторам
	const canUserEditSpaceMembers = authData?.id === space?.ownerID;

	return (
		<div className={s.SpaceInfo}>
			<div className={s.description}>
				<Avatar
					className={s.avatar}
					src={
						// TODO расхардкодить
						'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13'
					}
				/>

				<Text title={space?.name} text={space?.description} />

				<LeaveSpace className={s.leaveSpaceButton} />
			</div>

			<Divider direction={'horizontal'} />

			<div className={s.membersHeader}>
				<Text title={'Участники:'} />

				<Button onClick={handleToggleAddSpaceMembersList}>Добавить</Button>

				{isAddSpaceMembersModalOpen && (
					<AddMembersModal
						isOpen={isAddSpaceMembersModalOpen}
						onClose={handleToggleAddSpaceMembersList}
					/>
				)}
			</div>

			<div className={s.membersList}>
				{space?.members.map((member) => {
					const dropdownMenuItems = [];

					if (authData?.id !== member.id && canUserEditSpaceMembers) {
						dropdownMenuItems.push({ label: <DeleteSpaceMember userID={member.id} /> });
					}

					return (
						<Space.MemberCard
							key={member.id}
							{...member}
							dropdownMenuItems={dropdownMenuItems}
						/>
					);
				})}
			</div>
		</div>
	);
};
