import { Space, useGetCurrentSpaceInfo } from 'entitites/Space';
import { Text, Avatar, Divider } from 'shared/ui';
import s from './CurrentSpace.module.scss';

export const CurrentSpace = () => {
	// TODO лоадеры
	const { space } = useGetCurrentSpaceInfo();

	return (
		<div className={s.CurrentSpace}>
			<Text
				title={'Текущее пространство'}
				text={'Информация о пространстве, которое выбрано в данный момент'}
			/>

			<Divider direction={'horizontal'} />

			<div className={s.spaceInfo}>
				<Avatar
					className={s.avatar}
					src={
						// TODO расхардкодить
						'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13'
					}
				/>

				<Text title={space?.name} text={space?.description} />
			</div>

			<Divider direction={'horizontal'} />

			<div className={s.membersList}>
				{space?.members.map((member) => (
					<Space.MemberCard
						key={member.id}
						{...member}
						dropdownMenuItems={[{ label: 'На мороз' }]}
					/>
				))}
			</div>
		</div>
	);
};
