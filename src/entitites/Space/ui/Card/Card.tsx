import classNames from 'classnames';
import { Avatar, Text } from 'shared/ui';
import type { ISpace } from '../../model/space';
import s from './Card.module.scss';

type Props = ISpace & {
	onClick?: (spaceID: ISpace['id']) => void;
	className?: string;
};

export const Card = (props: Props) => {
	const { id, name, members, onClick, className } = props;

	const handleClick = () => {
		onClick?.(id);
	};

	return (
		<div className={classNames(s.Card, className)} onClick={handleClick}>
			{/* TODO расхардкодить */}
			<div>
				<Avatar
					src={
						'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13'
					}
					className={s.avatar}
				/>

				<Text title={name} className={s.personalInfo} />

				<div className={s.membersTitle}>Участники: </div>

				<div className={s.members}>
					{members.slice(0, 4).map((member, index) => (
						<Avatar
							src={member.avatar}
							key={member.id}
							className={s.memberAvatar}
							style={{ transform: `translateX(-${index * 15}px)` }}
						/>
					))}

					{members.length > 4 && (
						<>
							<div className={s.membersPlusCounter}>+{members.length - 4}</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
