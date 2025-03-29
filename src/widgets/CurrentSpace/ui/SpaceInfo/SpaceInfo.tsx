import { Space, useGetCurrentSpaceInfo } from 'entitites/Space';
import { useUserStore } from 'entitites/User';
import { DeleteSpaceMember } from 'features/DeleteSpaceMember';
import { LeaveSpace } from 'features/LeaveSpace';
import { Avatar, Divider, Text } from 'shared/ui';
import s from './SpaceInfo.module.scss';

export const SpaceInfo = () => {
	const { authData } = useUserStore();

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

			<Text title={'Участники:'} />

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
