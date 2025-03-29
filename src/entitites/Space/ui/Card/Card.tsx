import classNames from 'classnames';
import { Avatar, Text } from 'shared/ui';
import type { ISpace } from '../../model/space';
import s from './Card.module.scss';

type TSize = 'small' | 'medium';

type Props = ISpace & {
	onClick?: (spaceID: ISpace['id']) => void;
	//
	size?: TSize;
	className?: string;
};

export const Card = (props: Props) => {
	const { id, name, members, onClick } = props;
	const { size = 'medium', className } = props;

	const handleClick = () => {
		onClick?.(id);
	};

	return (
		<div className={classNames(s.Card, s[size], className)} onClick={handleClick}>
			{/* TODO расхардкодить */}
			<div>
				<Avatar
					src={
						'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13'
					}
					className={s.avatar}
				/>

				<Text title={name} size={size} />

				<div className={s.members}>
					{size !== 'small' && <div className={s.membersTitle}>Участники:</div>}

					<div className={s.membersList}>
						{members.slice(0, 4).map((member, index) => (
							<Avatar
								src={member.avatar}
								key={member.id}
								className={s.memberAvatar}
								style={{ transform: `translateX(-${index * 15}px)` }}
							/>
						))}

						{members.length > 4 && (
							<div className={s.membersPlusCounter}>+{members.length - 4}</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
